# Starter für das LF10 Projekt

## Requirements

* Docker https://docs.docker.com/get-docker/
* Docker compose (bei Windows und Mac schon in Docker enthalten) https://docs.docker.com/compose/install/

### Abhängigkeiten starten (Postgres, EmployeeBackend, Authentik)

```bash
docker compose up
```

Achtung: Der Docker-Container läuft dauerhaft! Wenn er nicht mehr benötigt wird, solltest du ihn stoppen.

### Abhängigkeiten stoppen

```bash
docker compose down
```

### Postgres Datenbank wipen, z.B. bei Problemen

```bash
docker compose down
docker volume rm docker_employee_postgres_data
docker compose up
```

## Swagger des Backends

```
http://localhost:8089/swagger
```

# Passwort für den User John erzeugen

Um ein gültiges App-Passwort für john zu generieren:

1. Melden Sie sich als Administrator unter localhost:9000 (a@b.com / secret)
2. Auf der Kachel employee_api -> more Details --> edit
3. Links auf Directory --> Users
4. Klicken Sie auf den User john
5. Klicken Sie auf Set Password und setzen Sie ein Passwort.


