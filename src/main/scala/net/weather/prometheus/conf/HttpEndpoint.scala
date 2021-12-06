package net.weather.prometheus.conf

case class HttpEndpoint(host: String, port: Int) {
  override def toString: String = s"$host:$port"
}
