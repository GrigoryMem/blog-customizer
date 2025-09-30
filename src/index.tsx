import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	submitForm,
} from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	initState,
	articlesData,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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
		console.log('я хозяин', styles);
	}

	return (
		<main className={clsx(styles.main)} style={dataStyles}>
			<ArticleParamsForm
				initState={initState}
				dataFields={articlesData}
				onSubmit={(data) => applyStyles(data)}
				onReset={() => applyStyles(initState)}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
