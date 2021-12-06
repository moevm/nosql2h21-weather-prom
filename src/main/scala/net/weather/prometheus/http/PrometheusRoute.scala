package net.weather.prometheus.http
import akka.http.scaladsl.server.Directives.{path, get}
import akka.http.scaladsl.server.Route
import fr.davit.akka.http.metrics.core.scaladsl.server.HttpMetricsDirectives.metrics
import fr.davit.akka.http.metrics.prometheus.PrometheusRegistry
import fr.davit.akka.http.metrics.prometheus.marshalling.PrometheusMarshallers.marshaller

object PrometheusRoute {

  private[this] final val registry: PrometheusRegistry = PrometheusRegistry()

  lazy val route: Route =
    path("metrics") {
      get {
        metrics(registry)
      }
    }
}
