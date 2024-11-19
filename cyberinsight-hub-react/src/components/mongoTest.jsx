import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const MongoConnectionTester = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:4000/api/test');
      const data = await response.json();

      if (data.success) {
        setStatus('connected');
      } else {
        setError(data.error || 'Connection failed');
        setStatus('error');
      }
    } catch (err) {
      setError(err.message);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>MongoDB Connection Tester</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <button 
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Testing Connection...' : 'Test Connection'}
          </button>

          {status && (
            <div className={`flex items-center gap-2 p-4 rounded ${
              status === 'connected' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {status === 'connected' ? (
                <CheckCircle2 className="text-green-600" />
              ) : (
                <AlertCircle className="text-red-600" />
              )}
              <span className={status === 'connected' ? 'text-green-600' : 'text-red-600'}>
                {status === 'connected' ? 'Successfully connected to MongoDB' : error}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MongoConnectionTester;