package net.weather.prometheus.application

case class AppBuilder(c: AppConfig) {
  val httpHost: String = c.httpEndpoint.host
  val httpPort: Int = c.httpEndpoint.port
}
