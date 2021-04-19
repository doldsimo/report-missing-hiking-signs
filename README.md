# Ionic React App

Repository für das Seminar **Aktuelle Entwicklungen im Bereich Online Medien**

---

## Inhaltsverzeichnis

- [Projektidee](#projektidee)
- [Technologien](#technologien)
- [Installation](#installation)
- [Deployen](#deployen)
- [Debuggen](#debuggen)
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

Die Installation einer Ionic App findet so gut wie ausschließlich über die Commando Zeile statt.

> **Vorausetzung:** Node.js muss installiert sein, damit der Node Package Manager (npm) genutzt werden kann.

Ionic CLI installieren:

    npm install -g @ionic/cli

### Erstellen eines neuen Ionic Projektes

Neues Projekt erstellen:

    ionic start

Frontend Framework auswählen:

![Pick a framework](./zdocumentation/img/installation/new-project.PNG 'Pick a framework')

Name des Projektes eingeben:

![project name](./zdocumentation/img/installation/new-project_1.PNG 'project name')

Wähle ein Starter-Template:
![starter template](./zdocumentation/img/installation/new-project_2.PNG 'starter template')

In den Ordner des neu erstellten Projektes navigieren:

    cd ./testProject

Lokaler Ionic deleopment Server starten:

    ionic serve

---

## Deployen

Da man mithilfe von Ionic Progressive Web Apps entickelt, kann man die gleiche App für unterschiedliche Plattformen deployen. Somit kann die App zum Beispiel als Web App, Android, oder IOS App deployed werden.

### Als Web App

Zum deployen der Ionic App als Web-App muss in der Konsole nur folgender Befehl eingegeben werden:

    ionic build

Dies erstellt mithilfe von Webpack ein optimierten **build**-Ordner in dem aller Code minifiziert und gebündelt wurde. Somit ist dieser Ordner nun dafür geeignet Online zu depolyen.

### Android App

> **Vorausetzung:** Android Studio muss installiert und konfiguriert sein

Erstellen eines optimierten build-Ordners:

    ionic build

Erstellen des Andorid-Ordners, welcher das eigenständige "native" Android Projekt darstellt:

    ionic cap add android

>*Es wird in der App ein Lokaler Server gestartet (Wrapper), welcher den erstellten, Webcode liest und darstellt. Über eine API werden dann aus diesem Wrapper native Schnittstellen angesprochen.*

Bei jeder änderung des Web-Codes muss ausgeführt werden:

    ionic cap copy

Bei Änderungen von nativem Code, oder beim hinzufügen neuer Plugins:

    ionic cap sync 

ausgeführt werden. Dies kopiert die Änderungen in das native Android Projekt

[Ionic Dokumentation zum Deployen von Android und IOS Apps](https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile)

---

## Debuggen

Viele nicht native Features kann man direkt im Browser debuggen, und somit die Entwicklungswerkzeuge von dem jeweiligen Browser benutzen.

Will man jedoch die nativen Features debuggen, ist das etwas aufwendiger.

[Dokumentation zu remote debugging](https://ionicframework.com/docs/cli/commands/capacitor-run)

> **Vorausetzung:** Android Studio muss installiert und konfiguriert sein

    ionic capacitor run android

Mit livereload:

    ionic capacitor run android --livereload --external

In Android Studio kann ausgewählt werden auf welchem Gerät die App gestartet werden soll.

Außerdem kann mithilfe von Android Studio auch der native Capacitor Code debuggt werden. Die Plugins befinden sich z.B. in:

> capacitor-android > java > com.getcapacitor > plugins  

### Debuggen auf externem Smartphone

1. Aktivieren der Entwickleroptionen auf dem externen Gerät.
2. In Entwickleroptionen USB-Debugging aktivieren und Smartphone mit Computer verbinden.
3. Projekt normal starten:

        ionic capacitor run android --livereload --external

    In Android Studio das extern verbunden Gerät auswählen und App starten.

### Chrome Remote Debugging

> **Vorausetzung:** Der Browser Google Chrome muss installiert und verwendet werden

Egal ob man auf einem externen Smartphone oder einem Android Emulator die App gestartet hat, kann man mit hilfe der Chrome Remote Debugging-Tools den lokal gestarteten Server auf dem Gerät debuggen.

    chrome://inspect/#devices

Danach sollte das Gerät in diesem Tab aufgelistet werden. Beim klick auf *inspect* öffnen sich die Goolge Chrome Entwicklertools und das externe Gerät kann debuggt werden.

![remote debugging](./zdocumentation/img/remoteDebugging/remotedDebugging.PNG 'remote debugging')

---

## Aufbau

Das Projekt ist in zwei Teile unterteilt:

client -> Fontend

server -> Backend
