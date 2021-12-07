package net.weather.prometheus.actor

import akka.actor.ActorSystem
import akka.event.{Logging, LoggingAdapter}

class WeatherActor {
  implicit val system: ActorSystem = ActorSystem("weather-http")
  implicit protected val log: LoggingAdapter = Logging(system, "main")
}
