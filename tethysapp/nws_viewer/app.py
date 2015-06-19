from tethys_apps.base import TethysAppBase, url_map_maker


class NwsViewer(TethysAppBase):
    """
    Tethys app class for Nws Viewer.
    """

    name = 'Nws Viewer'
    index = 'nws_viewer:home'
    icon = 'nws_viewer/images/icon.gif'
    package = 'nws_viewer'
    root_url = 'nws-viewer'
    color = '#e67e22'
        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='nws-viewer',
                           controller='nws_viewer.controllers.home'),
        )

        return url_maps