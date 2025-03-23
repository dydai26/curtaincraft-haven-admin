
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';

const AdminNavLink: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <Button variant="outline" size="sm" asChild className="ml-2">
      <Link to="/admin">
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Адмін панель
      </Link>
    </Button>
  );
};

export default AdminNavLink;
