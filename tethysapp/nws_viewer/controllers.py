from django.shortcuts import render
from tethys_gizmos.gizmo_options import MVLegendClass, MVLayer, MapView, MVDraw, MVView


def home(request):
    """
    Controller for the app home page.
    """
    # Configure Sliders
    

    # Define view options for the map
    view_options = MVView(
      projection='EPSG:4326',
      center=[-95.47, 40.8],
      zoom=4,
      maxZoom=18,
      minZoom=2
    )  

    arc_gis_layer = MVLayer(
    	source='TileArcGISRest',
    	options = {'url': 'http://gis.ncdc.noaa.gov/arcgis/rest/services/' + 'cdo/nexrad/MapServer',
                'params': 'id:NEXRAD:KMTX'},
      legend_title = 'NWS Precip Forecast',
    	legend_extent = [-173, 17, -65, 72]
    )

    # Define map view options
    map_view_options = MapView(
      height='600px',
      width='100%',
      controls=['ZoomSlider', 'Rotate', 'FullScreen',
                {'MousePosition': {'projection': 'EPSG:4326'}},],
      layers=[arc_gis_layer],
      view=view_options,
      basemap={'MapQuest': {'layer': 'osm'}},
      legend=True
    )

    context = {'map_view_options': map_view_options}

    return render(request, 'nws_viewer/home.html', context)