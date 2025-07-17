import { Shield } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/base/button/button';
import { H1 } from '@/components/ui/base/typography/typography';

import { ModeToggle } from './mode-toggle';

export default function Header() {
  return (
    <div className="w-full h-header bg-header shadow-lg flex justify-center">
      <div className="w-full max-w-4xl p-2 flex justify-between items-center">
        <H1><Link href="/">Marking Hours</Link></H1>
        <div className="space-x-2">
          <Button asChild>
            <Link href="/admin" className="text-lg">
              <Shield /> Admin
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
