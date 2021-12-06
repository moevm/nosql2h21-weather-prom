FROM maven:3.8.3-jdk-11-slim AS build
MAINTAINER iiurka

COPY src /home/app/src
COPY pom.xml /home/app/pom.xml
RUN mvn -f /home/app/pom.xml clean package


FROM openjdk:11-jre-slim
MAINTAINER iiurka

COPY --from=build /home/app/target/nosql2h21-weather-prom-1.0-SNAPSHOT-allinone.jar /usr/local/lib/weather.jar
COPY src/main/resources/region /data
EXPOSE 8080
CMD ["java", "-jar", "/usr/local/lib/weather.jar"]
