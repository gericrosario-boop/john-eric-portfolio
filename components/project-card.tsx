'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <Link href={`/work/${project.slug}`} className="block">
          <div className="relative aspect-[16/10] bg-muted">
            {project.cover_type === 'image' ? (
              <Image src={project.cover_url} alt={project.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            ) : (
              <video
                className="h-full w-full object-cover"
                src={project.cover_url}
                muted
                playsInline
                controls={false}
                preload="metadata"
              />
            )}
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{project.title}</h3>
              <span className="text-xs text-muted-foreground">{project.year}</span>
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
