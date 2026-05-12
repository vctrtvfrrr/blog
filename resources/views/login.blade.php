@extends('layout')

@section('content')
  <div class="container">
    <section class="section">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h2 class="title is-2">{{ __('Login') }}</h2>

            <form method="POST" action="{{ route('login') }}">
              @csrf

              <div class="field">
                <label for="email" class="label">{{ __('E-Mail Address') }}</label>

                <div class="control">
                  <input id="email" type="email" class="input{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

                  @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $errors->first('email') }}</strong>
                    </span>
                  @endif
                </div>
              </div>

              <div class="field">
                <label for="password" class="label">{{ __('Password') }}</label>

                <div class="control">
                  <input id="password" type="password" class="input{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                  @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $errors->first('password') }}</strong>
                    </span>
                  @endif
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input class="checkbox" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    {{ __('Remember Me') }}
                  </label>
                </div>
              </div>

              <div class="control">
                <button type="submit" class="button is-primary">
                  {{ __('Login') }}
                </button>

                @if (Route::has('password.request'))
                  <a class="button is-link" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                  </a>
                @endif
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
@endsection
