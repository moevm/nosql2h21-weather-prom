package net.weather.prometheus.application

import com.typesafe.config.{Config, ConfigFactory}
import net.weather.prometheus.conf.HttpEndpoint

import java.util.concurrent.TimeUnit
import scala.concurrent.duration.{DurationLong, FiniteDuration}

case class AppConfig(httpEndpoint: HttpEndpoint, awaitTime: FiniteDuration)

object AppConfig {
  def apply(confName: String): AppConfig = {
    val c: Config = ConfigFactory.parseResources(confName).withFallback(ConfigFactory.load())
    val httpConf = c.getConfig("http")
    val awaitTime = c.getDuration("await", TimeUnit.MINUTES)

    new AppConfig(
      HttpEndpoint(
        httpConf.getString("host"),
        httpConf.getInt("port")
      ),
      awaitTime.minutes
    )
  }
}
