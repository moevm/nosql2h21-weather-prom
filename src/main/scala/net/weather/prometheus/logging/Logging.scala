package net.weather.prometheus.logging

import akka.event.LoggingAdapter
import net.weather.prometheus.actor.WeatherActor

trait Logging extends WeatherActor {
  override val log: LoggingAdapter = system.log
}
