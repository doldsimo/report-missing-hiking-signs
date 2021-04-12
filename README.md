# Ionic React App

Repository für das Seminar **Aktuelle Entwicklungen im Bereich Online Medien**

---

## Inhaltsverzeichnis

- [Projektidee](#projektidee)
- [Technologien](#technologien)
- [Installation](#installation)
- [Aufbau des Projektes](#aufbau)

---

## Projektidee

Entwicklung einer App, bei welcher man fehlende, unklare oder beschädigte Beschilderungen von Wanderwegen melden kann. Dies soll mit Hilfe eines Bildes, kleinen Textes und den genauen GPS-Daten an einen z.B. einen Wanderverein im Schwarzwald gemeldet werden können.

### Anwendungszenario

Ein Wanderer hat vor Antritt seiner Wanderung die App auf seinem Smartphone installiert. Im Laufe seiner Wanderung kommt er an eine Stelle, wo er nicht weiß, welchem Weg er folgen soll. An dieser Stelle nimmt er sein Smarthone, macht von der Kreuzung und den fehlenden Schildern mit Hilfe der App ein Bild. Die App greift im Hintergrund auf die GPS-Daten des Smartphones zurück. Der Wanderer kann nach Eingabe eines kurzen Textes die Anfrage abschicken.
Somit kann im Nachgang von einem Wanderverein die Beschilderung ihrer Wege gewartet und instandgesetzt werden.  

---

## Technologien

### Ionic

[Ionic](https://ionicframework.com/) ist ein Webframework zur Erstellung von Progressiven Web Apps auf der Basis von HTML5, CSS/SASS, und Javascript/Typescript.
Ionic ist kompatibel mit den gängigen Frameworks wie React, Vue, Angular oder auch reinem Javascript.

Ionic kann in zwei Bereiche unterteilt werden:

- Zum einen liefert das Framework Komponenten, welche mit Hilfe von Webtechnologien im Style von nativ aussehenden Android und IOS Komponenten „nachgebaut“ wurden.
Komponenten Beispiele: <https://ionicframework.com/docs/components>

- Zum anderen bietet Ionic mit Capacitor die Möglichkeit Native Features in eine App zu integrieren, wie beispielsweise Zugriff auf GPS, Kamera usw.
Capacitor biete eine Anzahl an Offiziellen Plugins für diese Zwecke, es gibt jedoch auch viele Community Plugins.
Plugin Beispiele: <https://capacitorjs.com/docs/plugins>

Die App soll folgende native Features beinhalten:

- Kamera
- Geolocation (GPS)

### React

[React](https://reactjs.org/) ist eine JavaScript-Softwarebibliothek, die ein Grundgerüst für die Ausgabe von User-Interface-Kombinationen von Websiten zur Verfügung stellt.

Als Backed verwende ich [Node.js](https://nodejs.org/en/) in Kombination mit [Express.js](https://expressjs.com/) und als Datenbank [MongoDB](https://www.mongodb.com/).

---

## Installation

Die Installation von Ionic einer App findet so gut wie ausschließlich über die Commando Zeile statt.

> **Vorausetzung:** Node.js muss installiert sein, damit der Node Package Manager (npm) genutzt werden kann.

Ionic CLI installieren:

    npm install -g @ionic/cli

### Erstellen eines neuen Ionic Projektes

Neues Projekt erstellen:

    ionic start

Dialog folgen und Frontend Framework auswählen:

![Pick a framework](./zdocumentation/img/installation/new-project.PNG 'Pick a framework')

Name des Projektes eingeben:

![project name](./zdocumentation/img/installation/new-project_1.PNG 'project name')

Wähle ein Starter-Template: 
![starter template](./zdocumentation/img/installation/new-project_2.PNG 'starter template')

In den Ordner des neu erstellten Projektes navigieren:

    cd ./testProject

Lokaler Ionic deleopment Server starten:

    ionic serve

## Aufbau

client -> Fontend

server -> Backend
