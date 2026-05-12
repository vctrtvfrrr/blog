<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Diaro') }}</title>

    <script src="{{ mix('js/app.js') }}" defer></script>

    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
  </head>

  <body>
    <div id="app">
      <nav class="navbar is-primary">
        <div class="navbar-brand">
          <a class="navbar-item" href="{{ route('entries.index') }}">
            <span class="icon is-large">
              <i class="fas fa-book fa-2x"></i>
            </span>
            <strong>{{ config('app.name', 'Diaro') }}</strong>
          </a>

          <a class="navbar-burger burger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                @guest
                  <a class="button is-primary" href="{{ route('login') }}">Entrar</a>
                @else
                  <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;"> @csrf </form>
                  <a class="button is-primary"href="{{ route('logout') }}"
                     onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    {{ __('Sair') }}
                  </a>
                @endguest
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main class="main-container">
        <div class="container">
          @yield('content')
        </div>
      </main>
    </div>
  </body>
</html>
