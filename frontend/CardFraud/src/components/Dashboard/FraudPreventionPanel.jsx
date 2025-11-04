import { Card, CardHeader, CardTitle, CardContent } from "@/components/Dashboard/ui/Card";
import { Button } from "@/components/Dashboard/ui/button";
import { resources } from '@/components/data/mockData';

export default function FraudPreventionPanel() {
  return (
    <Card className="shadow-sm border border-gray-100">
      <CardHeader className="px-5 py-4 border-b border-gray-100">
        <CardTitle className="text-lg font-heading font-semibold text-gray-800">Fraud Prevention Resources</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {/* Credit card security image */}
        <div 
          className="w-full h-40 bg-cover bg-center rounded-lg mb-4"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400')" 
          }}
          aria-label="Credit card security concept with padlock"
        />
        
        <h3 className="text-md font-semibold text-gray-800 mb-2">Latest Resources</h3>
        <ul className="space-y-3">
          {resources.map((resource) => (
            <li key={resource.id} className="flex items-start">
              <span className="mt-0.5 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {resource.icon === 'fas fa-file-alt' && (
                    <>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </>
                  )}
                  {resource.icon === 'fas fa-video' && (
                    <>
                      <path d="M15 6v12a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3z" />
                      <path d="M22 12l-7-6v12l7-6z" />
                    </>
                  )}
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                <p className="text-xs text-gray-500">
                  {resource.type === 'video' 
                    ? resource.duration 
                    : `Published ${new Date(resource.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric'
                      })}`}
                </p>
              </div>
            </li>
          ))}
        </ul>
        
        <Button className="w-full mt-4 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
          Access Resource Center
        </Button>
      </CardContent>
    </Card>
  );
}