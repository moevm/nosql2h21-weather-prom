package net.weather.prometheus.application

import com.typesafe.config.{Config, ConfigFactory}
import net.weather.prometheus.conf.HttpEndpoint

case class AppConfig(httpEndpoint: HttpEndpoint, prometheusEndpoint: HttpEndpoint, pushgatewayEndpoint: HttpEndpoint)

object AppConfig {
  def apply(confName: String): AppConfig = {
    val c: Config = ConfigFactory.parseResources(confName).withFallback(ConfigFactory.load())
    val httpConf = c.getConfig("http")
    val prometheusConf = c.getConfig("prometheus")
    val pushGatewayConf = prometheusConf.getConfig("pushgateway")

    new AppConfig(
      HttpEndpoint(
        httpConf.getString("host"),
        httpConf.getInt("port")
      ),
      HttpEndpoint(
        prometheusConf.getString("host"),
        prometheusConf.getInt("port")
      ),
      HttpEndpoint(
        pushGatewayConf.getString("host"),
        pushGatewayConf.getInt("port")
      )
    )
  }
}
