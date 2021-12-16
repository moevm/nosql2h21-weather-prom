package net.weather.prometheus.collector

import io.prometheus.client.Gauge
import net.weather.prometheus.logging.Logging
import net.weather.prometheus.util.TimeUnits
import play.api.libs.json.{JsArray, JsValue, Json}

import java.io.{File, FileInputStream, IOException}
import java.util.concurrent.Executors
import scala.concurrent.{ExecutionContext, ExecutionContextExecutorService, Future}
import scala.util.Try


final class PromCollector extends Logging {

  def collect(): Future[List[Unit]] = {
    val dirs = getDirectories("/data")
    val future = dirs.flatMap { dir => getDirectories(dir.getAbsolutePath).map {
      val metric = Gauge
        .build()
        .name(dir.getName)
        .help(dir.getName)
        .labelNames("region", "time_unit")
        .register()

      timeUnitDir => Try {
        val timeUnit = TimeUnits.withName(timeUnitDir.getName)
        val json = getJson(timeUnitDir.getAbsolutePath)
        val data = transformJsArray((json \ dir.getName).as[JsArray])
        val regions = Iterator.continually((json \ "geo_region").as[Seq[String]].map(_.trim)).flatten
        Future {
          timeUnit match {
            case _ => data.foreach { value =>
              metric
                .labels(regions.next, timeUnit.toString)
                .set(value.getOrElse(0.0))
              Thread.sleep(1000)
            }
          }
        }
      }.getOrElse {
        log.info(s"Skip dir: ${timeUnitDir.getName}")
        Future.unit
      }
    }}
    Future.sequence(future)
  }

  implicit private val ec: ExecutionContextExecutorService =
    ExecutionContext.fromExecutorService(Executors.newFixedThreadPool(40))

  private def getDirectories(path: String): List[File] =
    Some(new File(path))
      .filter(_.exists)
      .filter(_.isDirectory)
      .map(_.listFiles.filter(_.isDirectory).toList)
      .getOrElse(List.empty)

  private def getJson(path: String): JsValue = {
    val dir = Some(new File(path))
    val file = dir
      .filter(_.exists)
      .filter(_.isDirectory)
      .map(_.listFiles.filter(_.isFile).toList)
      .flatMap(_.find(_.isFile))

    file
      .map(new FileInputStream(_))
      .map(stream => Try(Json.parse(stream)).getOrElse {
        log.error(s"Bad parse json: ${file.get.getName}")
        throw new IOException(s"Bad parse json: ${file.get.getName}")
      })
      .getOrElse {
        log.error(s"In dir $path are no one file")
        throw new IOException(s"Bad parse json: ${file.get.getName}")
      }
  }

  private def transformJsArray(array: JsArray): Seq[Option[Double]] =
    array.value.map(value => Try(value.as[Double]).toOption)
}
