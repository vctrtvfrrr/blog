<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use GrahamCampbell\Markdown\Facades\Markdown;

class EntriesController extends Controller
{
    /**
     * @var Storage
     */
    protected $storage = null;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->storage = Storage::disk('diaro');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $storage = &$this->storage;

        $files = collect($storage->files())->sortKeysDesc();

        $entries = $this->paginate($files, 15, $request->get('page', 1));

        $collection = $entries->getCollection()
            ->mapWithKeys(function ($file) use ($storage) {
                $content = $storage->get($file);
                $content = Markdown::convertToHtml($content);

                return [$file => $content];
            });

        $entries = $entries->setCollection($collection);

        $entries->withPath(url()->current());

        return view('entries')->with('entries', $entries);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $date = Carbon::parse($request->input('datetime'));
        $title = '# Diário - ' . $date->format('d/m/Y');
        $body = $request->input('content');
        $filename = $date->format('Y-m-d') . '.md';
        $content = join("\n\n", [$title, $body]);

        $this->storage->put($filename, $content);

        return redirect()->route('entries.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function show(Entry $entry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function edit(Entry $entry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Entry $entry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entry $entry)
    {
        //
    }
}
