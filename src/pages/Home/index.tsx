import React from "react";
import api from "../../services/api";
import { ButtonsContainer, Container } from "./styles";
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Upload from "../../components/Upload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";

interface CsvContent {
  new_price: string,
  product_code: string,
}

const Home: React.FC = () => {
  const [file, setFile] = React.useState<File>();
  const [csvArr, setCsvArr] = React.useState<CsvContent[]>([]);
  const [disableAtualizar, setDisableAtualizar] = React.useState<boolean>(true);
  const [loadingValidar, setLoadingValidar] = React.useState<boolean>(false);
  const [loadingAtualizar, setLoadingAtualizar] = React.useState<boolean>(false);

  const handleUpload = async (files: File[]) => {
    const selectedFile: File = await files[0];
    setFile(selectedFile);
  };

  const handleValidar = async () => {
    Papa.parse(file as File, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        setCsvArr(results.data);
        validateFile();
      },
    });
  };

  const validateFile = async () => {
    setLoadingValidar(true);

    await api.post(`/validar-csv`, { csvArr })
      .then(response => {
        setDisableAtualizar(false);
        toast.success("Arquivo CSV válido");
      })
      .catch(err => {
        console.error(err);
        toast.error("Arquivo CSV inválido");
      })
      .finally(() => {
        setLoadingValidar(false);
      });
  };

  const handleAtualizar = async () => {
    setLoadingAtualizar(true);
    await api.put(`/atualizar-precos`, { csvArr })
      .then(response => {
        setFile(undefined);
        setDisableAtualizar(true);
        toast.success("Preços atualizados com sucesso!");
      })
      .catch(err => {
        console.error(err);
        toast.error("Falha ao atualizar preços. " + err);
      })
      .finally(() => {
        setLoadingAtualizar(false);
      });
  };

  return (
    <Container>
      <Typography variant="h5">Update Prices</Typography>

      <Upload onUpload={handleUpload} />

      <ButtonsContainer>
        <LoadingButton
          variant="contained"
          color="info"
          disabled={!file}
          loading={loadingValidar}
          onClick={handleValidar}
        >
          Validar
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="success"
          disabled={disableAtualizar}
          loading={loadingAtualizar}
          onClick={handleAtualizar}
        >
          Atualizar
        </LoadingButton>
      </ButtonsContainer>

      
    </Container>
  );
}

export default Home;