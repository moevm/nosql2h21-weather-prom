package net.weather.prometheus.application

import akka.http.scaladsl.Http
import akka.http.scaladsl.server.RouteConcatenation._
import akka.http.scaladsl.server.Route
import net.weather.prometheus.actor.WeatherActor
import net.weather.prometheus.http.{CounterRoute, PrometheusRoute}

import scala.concurrent.Future

case class AppBuilder(c: AppConfig) extends WeatherActor {
  val httpHost: String = c.httpEndpoint.host
  val httpPort: Int = c.httpEndpoint.port
  val routes: Route = CounterRoute.route ~ PrometheusRoute.route

  val bindingFuture: Future[Http.ServerBinding] =
    Http()
      .newServerAt(httpHost, httpPort)
      .bind(routes)
}
