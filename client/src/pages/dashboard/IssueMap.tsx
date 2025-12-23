import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useStore } from '@/lib/store';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDemoKeyForCampusConnect'; // Demo key - replace with real key

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

// Campus center coordinates (example: San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

interface SelectedMarker {
  id: string;
  position: { lat: number; lng: number };
}

export default function IssueMap() {
  const { issues } = useStore();
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(null);

  // Generate random coordinates within a radius for demo purposes
  const generateCoordinates = (index: number) => {
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;
    return {
      lat: defaultCenter.lat + latOffset,
      lng: defaultCenter.lng + lngOffset,
    };
  };

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'in-progress':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      default:
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">Issue Map</h1>
          <p className="text-muted-foreground mt-1">View all campus issues by location</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Campus Issue Locations
            </CardTitle>
            <CardDescription>
              Click on markers to view issue details. Red = Open, Yellow = In Progress, Green = Resolved
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={15}>
                {issues.map((issue, index) => {
                  const position = generateCoordinates(index);
                  return (
                    <MarkerF
                      key={issue.id}
                      position={position}
                      icon={getMarkerColor(issue.status)}
                      onClick={() =>
                        setSelectedMarker({
                          id: issue.id,
                          position,
                        })
                      }
                    >
                      {selectedMarker?.id === issue.id && (
                        <InfoWindowF
                          position={position}
                          onCloseClick={() => setSelectedMarker(null)}
                        >
                          <div className="p-3 max-w-xs">
                            <h3 className="font-semibold text-sm">{issue.title}</h3>
                            <p className="text-xs text-gray-600 mt-1">{issue.location}</p>
                            <div className="mt-2 space-y-1 text-xs">
                              <p>
                                <strong>Category:</strong> {issue.category}
                              </p>
                              <p>
                                <strong>Status:</strong>{' '}
                                <span className="capitalize">{issue.status}</span>
                              </p>
                              <p>
                                <strong>Priority:</strong>{' '}
                                <span className="capitalize">{issue.priority}</span>
                              </p>
                            </div>
                          </div>
                        </InfoWindowF>
                      )}
                    </MarkerF>
                  );
                })}
              </GoogleMap>
            </LoadScript>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Open Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {issues.filter(i => i.status === 'open').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {issues.filter(i => i.status === 'in-progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {issues.filter(i => i.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note about API Key */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-1">Google Maps Integration</p>
            <p>To enable the live map, add your Google Maps API key to the environment variables. Visit <a href="https://console.cloud.google.com" className="underline font-semibold">Google Cloud Console</a> to get your API key.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
