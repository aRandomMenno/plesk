<?php

class AgendaValidatie {
    private $fouten = [];

    public function valideerAgendaItem($gegevens) {
        $this->fouten = [];
        
        $this->valideerTitel($gegevens["titel"] ?? "");
        $this->valideerOmschrijving($gegevens["omschrijving"] ?? "");
        $this->valideerBeginDatum($gegevens["begin_datum"] ?? "");
        $this->valideerEindDatum($gegevens["eind_datum"] ?? "", $gegevens["begin_datum"] ?? "");
        $this->valideerPrioriteit($gegevens["prioriteit"] ?? "");
        $this->valideerTags($gegevens["tags"] ?? "");
        $this->valideerStatus($gegevens["status"] ?? "");
        
        return empty($this->fouten);
    }

    public function getFouten() {
        return $this->fouten;
    }

    public function getFoutenAlsString() {
        return implode("<br>", $this->fouten);
    }

    public function maakVeilig($gegevens) {
        $veilige_gegevens = [];
        
        foreach ($gegevens as $sleutel => $waarde) {
            if (is_string($waarde)) {
                $waarde = trim($waarde);
                $waarde = strip_tags($waarde);
                $waarde = htmlspecialchars($waarde, ENT_QUOTES, "UTF-8");
            }
            $veilige_gegevens[$sleutel] = $waarde;
        }
        
        return $veilige_gegevens;
    }

    private function valideerTitel($titel) {
        $titel = trim(strip_tags($titel));
        
        if (empty($titel)) {
            $this->fouten[] = "Titel is verplicht.";
            return;
        }
        
        if (strlen($titel) > 32) {
            $this->fouten[] = "Titel mag niet langer dan 32 karakters zijn.";
        }
        
        if (strlen($titel) < 3) {
            $this->fouten[] = "Titel moet minimaal 3 karakters bevatten.";
        }
    }

    private function valideerOmschrijving($omschrijving) {
        $omschrijving = trim(strip_tags($omschrijving));
        
        if (empty($omschrijving)) {
            $this->fouten[] = "Omschrijving is verplicht.";
            return;
        }
        
        if (strlen($omschrijving) > 256) {
            $this->fouten[] = "Omschrijving mag niet langer dan 256 karakters zijn.";
        }
        
        if (strlen($omschrijving) < 10) {
            $this->fouten[] = "Omschrijving moet minimaal 10 karakters bevatten.";
        }
    }

    private function valideerBeginDatum($begin_datum) {
        if (empty($begin_datum)) {
            $this->fouten[] = "Begin datum is verplicht.";
            return;
        }
        
        $datum = DateTime::createFromFormat("Y-m-d\TH:i", $begin_datum);
        if (!$datum || $datum->format("Y-m-d\TH:i") !== $begin_datum) {
            $this->fouten[] = "Begin datum heeft een ongeldig formaat.";
        }
    }

    private function valideerEindDatum($eind_datum, $begin_datum) {
        if (empty($eind_datum)) {
            $this->fouten[] = "Eind datum is verplicht.";
            return;
        }
        
        $eind_datum_object = DateTime::createFromFormat("Y-m-d\TH:i", $eind_datum);
        if (!$eind_datum_object || $eind_datum_object->format("Y-m-d\TH:i") !== $eind_datum) {
            $this->fouten[] = "Eind datum heeft een ongeldig formaat.";
            return;
        }
        
        if (!empty($begin_datum)) {
            $begin_datum_object = DateTime::createFromFormat("Y-m-d\TH:i", $begin_datum);
            if ($begin_datum_object && $eind_datum_object <= $begin_datum_object) {
                $this->fouten[] = "Eind datum moet na de begin datum liggen.";
            }
        }
    }

    private function valideerPrioriteit($prioriteit) {
        if ($prioriteit === "" || $prioriteit === null) {
            $this->fouten[] = "Prioriteit is verplicht.";
            return;
        }
        
        if (!is_numeric($prioriteit)) {
            $this->fouten[] = "Prioriteit moet een nummer zijn.";
            return;
        }
        
        $prioriteit = (int)$prioriteit;
        if ($prioriteit < 1) {
            $this->fouten[] = "Prioriteit mag niet kleiner dan 1 zijn.";
        }
    }

    private function valideerTags($tags) {
        if (!empty($tags)) {
            $tags = trim(strip_tags($tags));
            $tag_lijst = array_map("trim", explode(",", $tags));
            $tag_lijst = array_filter($tag_lijst, function($tag) {
                return !empty($tag);
            });
            
            if (count($tag_lijst) > 5) {
                $this->fouten[] = "Er mogen maximaal 5 tags worden gebruikt.";
            }
            
            foreach ($tag_lijst as $tag) {
                if (strlen($tag) > 20) {
                    $this->fouten[] = "Tag '$tag' mag maximaal 20 karakters bevatten.";
                }
                if (!preg_match("/^[a-zA-Z0-9\s\-_]+$/", $tag)) {
                    $this->fouten[] = "Tag '$tag' bevat ongeldige karakters.";
                }
            }
        }
    }

    private function valideerStatus($status) {
        if (!empty($status)) {
            $status = trim(strip_tags($status));
            $geldige_statussen = ["aankomend", "bezig", "klaar", "onbekend"];
            
            if (!in_array(strtolower($status), $geldige_statussen)) {
                $this->fouten[] = "Status moet een van de volgende zijn: aankomend, bezig, klaar, onbekend.";
            }
        }
    }
}
