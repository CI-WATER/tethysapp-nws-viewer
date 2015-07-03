from django.shortcuts import render
from tethys_gizmos.gizmo_options import MVLegendClass, MVLayer, MapView, MVDraw, MVView
from tethys_apps.sdk.gizmos import RangeSlider


def home(request):
    """
    Controller for the app home page.
    """   

    # Slider for time step animation
    timeStepSlider = RangeSlider(display_text='Slide to change animation time step',
      name='timeStepSlider',
      min=0,
      max=10,
      initial=2,
      step=0.5
    )

    # Define view options for the map
    view_options = MVView(
      projection='EPSG:4326',
      center=[-95.47, 40.8],
      zoom=4,
      maxZoom=18,
      minZoom=2
    )  

    # Define map view options
    map_view_options = MapView(
      height='600px',
      width='100%',
      controls=['ZoomSlider', 'Rotate', 'FullScreen',
                {'MousePosition': {'projection': 'EPSG:4326'}},],
      layers=[],
      view=view_options,
      basemap={'MapQuest': {'layer': 'osm'}},
      legend=True
    )

    context = {'map_view_options': map_view_options, 'timeStepSlider': timeStepSlider}

    return render(request, 'nws_viewer/home.html', context)