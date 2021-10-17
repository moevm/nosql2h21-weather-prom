package net.weather.prometheus.application

import com.typesafe.config.{Config, ConfigFactory}
import net.weather.prometheus.conf.HttpEndpoint

case class AppConfig(httpEndpoint: HttpEndpoint) {

}

object AppConfig {
  def apply(confName: String): AppConfig = {
    val c: Config = ConfigFactory.parseResources(confName)
    val httpConf = c.getConfig("http")

    new AppConfig(
      HttpEndpoint(httpConf.getString("host"), httpConf.getInt("port"))
    )
  }
}
