export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container-shell text-sm text-muted-foreground">
        © {new Date().getFullYear()} John Eric Portfolio. Built with Next.js + Supabase.
      </div>
    </footer>
  );
}
