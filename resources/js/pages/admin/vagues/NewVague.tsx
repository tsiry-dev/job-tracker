import Badge from "@/components/app/Badge";
import FormContent from "@/components/app/FormContent";
import FormContentGroup from "@/components/app/FormContentGroup";
import { Level } from "@/types/level";
import { useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import Swal from "sweetalert2";

type NewVagueProps = {
  levels: Level[];
};

export default function NewVague({ levels }: NewVagueProps) {

    console.log(levels);


  const form = useForm({
    horaires: "",     // par exemple "Matin" ou "Midi"
    hour: "",
    start_date: "",
    end_date: "",
    level_id: "",     // pour le niveau sélectionné
  });

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.errors);


    // Post vers la route "admin.vagues.create"
    form.post(route("admin.vagues.create"), {
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Ajout avec succès",
            showConfirmButton: false,
            timer: 2000
        });
        form.reset();
      },
      onError: () => {
        // Tu peux gérer des effets en cas d'erreur
      },
    });



  };




  return (
    <form onSubmit={handleSubmit}>
      <FormContentGroup>
        <FormContent label="Horaires" name="horaires">
          <select
            name="horaires"
            className="form-input"
            value={form.data.horaires}
            onChange={(e) => form.setData("horaires", e.target.value)}
          >
            <option value="">Sélectionner un horaire</option>
            <option value="Matin">Matin</option>
            <option value="Midi">Midi</option>
          </select>
          {form.errors.horaires && (
            <div className="text-red-600 mt-1">{form.errors.horaires}</div>
          )}
        </FormContent>

        <FormContent label="Heure" name="hour">
          <input
            type="time"
            className="form-input"
            value={form.data.hour}
            onChange={(e) => form.setData("hour", e.target.value)}
          />
          {form.errors.hour && (
            <div className="text-red-600 mt-1">{form.errors.hour}</div>
          )}
        </FormContent>
      </FormContentGroup>

      <FormContentGroup>
        <FormContent label="Début" name="start_date">
          <input
            type="date"
            className="form-input"
            value={form.data.start_date}
            onChange={(e) => form.setData("start_date", e.target.value)}
          />
          {form.errors.start_date && (
            <div className="text-red-600 mt-1">{form.errors.start_date}</div>
          )}
        </FormContent>

        <FormContent label="Fin (Facultatif)" name="end_date">
          <input
            type="date"
            className="form-input"
            value={form.data.end_date}
            onChange={(e) => form.setData("end_date", e.target.value)}
          />
          {form.errors.end_date && (
            <div className="text-red-600 mt-1">{form.errors.end_date}</div>
          )}
        </FormContent>
      </FormContentGroup>

      <FormContent label="Niveaux" name="level_id">
        {levels.length > 0 ? (
          <select
            name="level_id"
            className="form-input"
            value={form.data.level_id}
            onChange={(e) => form.setData("level_id", e.target.value)}
          >
            <option value="">Sélectionner un niveau</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="mt-2">
            <Badge icon type="error">
              Veuillez ajouter des niveaux
            </Badge>
          </div>
        )}
        {form.errors.level_id && (
          <div className="text-red-600 mt-1">{form.errors.level_id}</div>
        )}
      </FormContent>

     {
        levels.length > 0 &&
        <div className="mt-4">
            <button
            type="submit"
            disabled={form.processing}
            className="btn-success flex items-center gap-2"
            >
            <Save size={15} />
            <span>Sauvegarder</span>
            </button>
      </div>
     }
    </form>
  );
}
