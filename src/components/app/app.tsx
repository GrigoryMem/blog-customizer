import { CSSProperties, useState } from 'react';
import { Article } from '../article';
import {
	ArticleParamsForm,
	submitForm,
} from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	initState,
	articlesData,
} from 'src/constants/articleProps';
import { FormElemsTitles } from 'src/constants/formData';
import { setRenderElementsForm } from './AppSettings';
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const initStyle = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties;

	const [dataStyles, setStyles] = useState(initStyle);

	function applyStyles(styles: submitForm) {
		setStyles({
			'--font-family': styles.fontFamily.value,
			'--font-size': styles.fontSize.value,
			'--font-color': styles.fontColor.value,
			'--container-width': styles.contentWidth.value,
			'--bg-color': styles.backgroundColor.value,
		} as CSSProperties);
	}

	return (
		<main className={styles.main} style={dataStyles}>
			<ArticleParamsForm
				initState={initState}
				dataFields={articlesData}
				titlesFields={FormElemsTitles}
				onSubmit={(data) => applyStyles(data)}
				onReset={() => applyStyles(initState)}>
				{(data) => setRenderElementsForm(data)}
			</ArticleParamsForm>
			<Article />
		</main>
	);
};
