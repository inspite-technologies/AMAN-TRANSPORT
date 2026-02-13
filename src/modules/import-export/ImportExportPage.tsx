import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const ImportExportPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Import / Export Management</h1>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Active Shipments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">List of ongoing import/export jobs.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Documentation Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Alerts for missing BL or commercial invoices.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
