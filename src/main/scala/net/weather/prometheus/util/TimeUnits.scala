package net.weather.prometheus.util

object TimeUnits extends Enumeration {
  type TimeUnit = Value

  val DAY: TimeUnit = Value(0, "day")
  val MONTH: TimeUnit = Value(1, "mon")
  val SEASON: TimeUnit = Value(2, "seas")
  val YEAR: TimeUnit = Value(3, "ann")
}
