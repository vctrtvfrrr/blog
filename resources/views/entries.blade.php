@extends('layout')

@section('content')
  <section class="section">
    @include('entries-form')
  </section>

  @if ($entries->isEmpty())
    <div class="no-entries">
      <i class="fas fa-pencil-alt fa-3x"></i><br>
      <p class="is-size-5">Nenhuma nota cadastrada!</p>
    </div>
  @else
    <div class="container">
      <ul>
        @foreach ($entries as $entry)
          <li class="box">{!! $entry !!}</li>
        @endforeach
      </ul>

      <section class="section">
        {{ $entries->links('vendor.pagination.bulma') }}
      </section>
    </div>
  @endif
@endsection
