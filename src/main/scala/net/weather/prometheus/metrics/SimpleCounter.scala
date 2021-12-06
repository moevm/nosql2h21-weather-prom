package net.weather.prometheus.metrics

import io.prometheus.client.Counter

object SimpleCounter {

  val myCounter: Counter =
    Counter
      .build()
      .name("simp")
      .labelNames("status")
      .help("Counter desc")
      .register()
}
