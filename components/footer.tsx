export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center gap-4 text-center md:gap-6">
        <div className="space-y-4">
          <h2 className="text-sm text-muted-foreground">Let&apos;s Connect!</h2>
          <div className="flex space-x-4">
            <p className="text-sm text-muted-foreground">Made with ❤️ by Rudrika Panigrahi</p>
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Rudrika Panigrahi. All rights reserved.</p>
        </div>
        </div>
      </div>
    </footer>
  )
}
