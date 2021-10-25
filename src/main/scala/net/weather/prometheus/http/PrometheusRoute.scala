package net.weather.prometheus.http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import fr.davit.akka.http.metrics.core.scaladsl.server.HttpMetricsDirectives._
import fr.davit.akka.http.metrics.prometheus.PrometheusRegistry
import fr.davit.akka.http.metrics.prometheus.marshalling.PrometheusMarshallers._

object PrometheusRoute {

  private[this] final val registry: PrometheusRegistry = PrometheusRegistry()

  lazy val route: Route =
    path("metrics") {
      get {
        metrics(registry)
      }
    }
}
