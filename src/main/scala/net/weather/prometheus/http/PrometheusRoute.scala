package net.weather.prometheus.http
import akka.http.scaladsl.marshalling.PredefinedToEntityMarshallers
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import net.weather.prometheus.metrics.SimpleCounter.myCounter
import fr.davit.akka.http.metrics.core.scaladsl.server.HttpMetricsDirectives._
import fr.davit.akka.http.metrics.prometheus.PrometheusRegistry
import fr.davit.akka.http.metrics.prometheus.marshalling.PrometheusMarshallers._

object PrometheusRoute {
  def apply(): Route = {
    val registry = PrometheusRegistry()
    path("prometheus") {
      get {
        complete {
          myCounter.labels("ok").inc()
          StatusCodes.OK
        }
      }
    } ~ path("metrics") {
      get {
        metrics(registry)
      }
    }
  }
}
