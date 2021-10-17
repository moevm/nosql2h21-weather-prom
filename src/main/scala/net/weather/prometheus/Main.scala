package net.weather.prometheus

import net.weather.prometheus.application.{AppBuilder, AppConfig}

/*
  Starting point
*/

object Main extends AppBuilder(AppConfig("prom.conf")) with App
