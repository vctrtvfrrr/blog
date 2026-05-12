{!! Form::open(['route' => isset($entry) ? ['entries.update', $entry->id] : 'entries.store']) !!}

<div class="field">
  {!! Form::label('datetime', 'Data', ['class' => 'label']) !!}
  <div class="control">
    {!! Form::date('datetime', date('Y-m-d'), ['class' => 'input']) !!}
  </div>
</div>

<div class="field">
  {!! Form::label('content', 'Conteúdo', ['class' => 'label']) !!}
  <div class="control">
    {!! Form::textarea('content', null, ['class' => 'textarea', 'rows' => 5]) !!}
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button type="submit" class="button is-link">
      <span class="icon">
        <i class="fas fa-save"></i>
      </span>
      <span>Salvar</span>
    </button>
  </div>
</div>

{!! Form::close() !!}
