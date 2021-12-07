package net.weather.prometheus.http

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.{complete, get, path}
import akka.http.scaladsl.server.Route
import net.weather.prometheus.metrics.SimpleCounter.myCounter

object CounterRoute {

  lazy val route: Route =
    path("ping") {
      get {
        complete {
          myCounter.labels("ok").inc()
          StatusCodes.OK
        }
      }
    }
}
