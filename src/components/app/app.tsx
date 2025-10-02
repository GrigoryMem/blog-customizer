import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, Fragment } from 'react';
import { Article } from '../article';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
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
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';
import { Select } from 'src/ui/select';

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
	}

	return (
		<main className={styles.main} style={dataStyles}>
			<ArticleParamsForm
				initState={initState}
				dataFields={articlesData}
				titlesFields={FormElemsTitles}
				onSubmit={(data) => applyStyles(data)}
				onReset={() => applyStyles(initState)}>
				{(renderElemData) => {
					if (
						renderElemData.key === 'fontSize' &&
						renderElemData.title &&
						renderElemData.selected
					) {
						return (
							<RadioGroup
								key={renderElemData.key}
								title={renderElemData.title}
								name={renderElemData.key}
								options={renderElemData.options}
								selected={renderElemData.selected}
								onChange={renderElemData.onChange}
							/>
						);
					}
					//  добавляем разделитель
					if (renderElemData.key === 'fontColor') {
						return (
							<Fragment key={renderElemData.key}>
								<Select
									options={renderElemData.options}
									title={renderElemData.title}
									selected={renderElemData.selected}
									onChange={renderElemData.onChange}
								/>
								<Separator />
							</Fragment>
						);
					}
					// рендер по умолчанию
					return (
						<Select
							key={renderElemData.key}
							options={renderElemData.options}
							title={renderElemData.title}
							selected={renderElemData.selected}
							onChange={renderElemData.onChange}
						/>
					);
				}}
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
