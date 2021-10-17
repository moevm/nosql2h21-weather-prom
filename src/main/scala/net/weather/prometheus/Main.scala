package net.weather.prometheus

import akka.actor.ActorSystem
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.Http
import net.weather.prometheus.application.{AppBuilder, AppConfig}
import net.weather.prometheus.http.PrometheusRoute

/*
  Starting point
*/

object Main extends AppBuilder(AppConfig("prom.conf")) with App {
  implicit val system: ActorSystem = ActorSystem("weather-http")
  implicit val log: LoggingAdapter = Logging(system, "main")

  val bindingFuture =
    Http()
      .newServerAt(httpHost, httpPort)
      .bind(PrometheusRoute())
}
