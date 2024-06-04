# ![Eventownik](https://github.com/Solvro/web-eventownik/blob/main/src/assets/eventownik_readme.png?raw=true)  

#### Aplikacja webowa do zarządzania stanem uzupełnienia pokoi oraz stolików na balu inżyniera.

#### A web application for managing the status of room and table occupancy for an engineering prom.

## PL
Projekt "Eventownik" to aplikacja webowa zaprojektowana do zarządzania rezerwacjami pokoi i stolików podczas balu inżynierskiego. Głównym celem aplikacji jest ułatwienie organizatorom i uczestnikom procesu rezerwacji, zapewniając intuicyjny interfejs do przeglądania dostępnych miejsc oraz dokonywania rezerwacji w czasie rzeczywistym. Aplikacja umożliwia także zarządzanie listami gości oraz wysyłanie powiadomień o statusie rezerwacji.

## EN
The "Eventownik" project is a web application designed to manage room and table reservations during an engineering prom. The main goal of the application is to simplify the reservation process for organizers and participants by providing an intuitive interface for viewing available spaces and making real-time reservations. The application also allows for managing guest lists and sending notifications about reservation statuses.

## Technologies
In developing this application, we used the following technologies:
* [Next](https://github.com/Solvro/web-eventownik/blob/main/src/assets/next_logo.png?raw=true)
* [Supabase](https://github.com/Solvro/web-eventownik/blob/main/src/assets/supabase_logo.png?raw=true)
* [Tailwindcss](https://github.com/Solvro/web-eventownik/blob/main/src/assets/tailwind_logo.png?raw=true)


## Links

* [Landing page](https://eventownik.solvro.pl/)
* [Figma](https://www.figma.com/design/WQW5P6ip5O7wycmwvFanUW/Eventownik---Main-Design?node-id=114-12150&t=81tGiOo09ZUwJfFj-0)

## Development
To set up the project locally, follow these steps:

```bash
  npm run deploy
```
Navigate to the project directory:

```bash
cd web-eventownik
```
Install the dependencies:
```bash
npm install
```
Set up environment variables.

Create a `.env` file in the root of the project and add your environment variables as needed. An example of what you might need:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```
Run the development server:

```bash
npm run dev
```