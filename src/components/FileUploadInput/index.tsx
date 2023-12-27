import { Grid } from '@mui/material';
import styles from './fileuploadinput.module.css';

const FileUploadInput = () => {
	return (
		<Grid>
			<label className={styles.uploadLabel} htmlFor="upload-dataset">
				Upload Dataset
			</label>
			<input id="upload-dataset" type="file" accept=".csv" hidden />
		</Grid>
	);
};

export default FileUploadInput;
