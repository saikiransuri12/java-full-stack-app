# ── Stage 1: Build ────────────────────────────────────────────────────
# Multi-stage build: build image is heavy (JDK + Maven), runtime image is slim (JRE only)
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy pom.xml first — Docker caches this layer so Maven deps aren't re-downloaded
# unless pom.xml changes (big build-time saving)
COPY pom.xml .
RUN mvn dependency:go-offline -B 2>/dev/null || true

COPY . .
RUN ./mvnw clean package -DskipTests -B

# ── Stage 2: Runtime ──────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
