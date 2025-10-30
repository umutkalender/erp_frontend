import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Change Language">
          <Globe className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Select Language</DialogTitle>
          <DialogDescription>
            Choose your preferred language
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-4">
          <Button
            variant={i18n.language === "en" ? "default" : "outline"}
            onClick={() => changeLanguage("en")}
            className="w-full justify-start"
          >
            🇬🇧 English
          </Button>
          <Button
            variant={i18n.language === "tr" ? "default" : "outline"}
            onClick={() => changeLanguage("tr")}
            className="w-full justify-start"
          >
            🇹🇷 Türkçe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

