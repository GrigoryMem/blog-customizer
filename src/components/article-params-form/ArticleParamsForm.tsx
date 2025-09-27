import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
// мои наработки
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { articlesData, OptionType } from 'src/constants/articleProps';
// import { StoryDecorator } from 'src/ui/story-decorator';
// import {}
import { Text } from 'src/ui/text';
//  пропсы для ArticleParamsForm

//  состояние данных формы
type FormState<T> = {
	fontFamily: T;
	fontSize: T;
	fontColor: T;
	backgroundColor: T;
	contentWidth: T;
};

type TitlesFormElems = string;

//названия шрифтов
const titleFormElements: FormState<TitlesFormElems> = {
	fontFamily: 'Шрифт',
	fontSize: 'Размер шрифта',
	fontColor: 'Цвет шрифта',
	backgroundColor: 'Цвет фона',
	contentWidth: 'Ширина контента',
};
//  ограничиваем ключи полей формы нашими данными -для типизации заголовков полей формы
type FormKeys = keyof typeof titleFormElements;
//  составляем кортеж для итерации по Object.entries - массив кортежей, по которым итерируемся
type PairData = [FormKeys, OptionType[]]; // кортеж типизации заголовка + массив опций

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [stateForm, setStateForm] = useState<FormState<OptionType>>({
		// формируем изначальное состояние
		fontColor: articlesData.fontColor[0],
		fontFamily: articlesData.fontFamily[0],
		fontSize: articlesData.fontSize[0],
		backgroundColor: articlesData.backgroundColor[0],
		contentWidth: articlesData.contentWidth[0],
	});

	function handleFormElemClick(
		option: OptionType,
		title?: string,
		namesFields?: Record<string, string>
	) {
		for (const key in namesFields) {
			if (title === namesFields[key]) {
				setStateForm({
					...stateForm,
					[key]: option,
				});
			}
		}
	}

	useEffect(() => {
		console.log(stateForm);
	}, [stateForm]);

	function handelOpenFormClick() {
		setIsOpen(!isOpen);
	}
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handelOpenFormClick();
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: true })}>
				<form className={styles.form}>
					{/* заголовок тоже можно пустить через пропс */}
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/* моя правка */}
					<div className={styles.selectGroup}>
						{(Object.entries(articlesData) as PairData[]).map(
							([title, options]) =>
								title === 'fontSize' ? (
									<RadioGroup
										key={title}
										title={titleFormElements[title]}
										name={title}
										options={options}
										selected={stateForm.fontSize}
										onChange={(option) => {
											handleFormElemClick(
												option,
												titleFormElements[title],
												titleFormElements
											);
										}}
									/>
								) : (
									<Select
										key={title}
										options={options}
										// кортеж PairData  а если такойключ title ?? в объекте таком то...
										title={titleFormElements[title]}
										selected={stateForm[title]}
										onChange={(option) => {
											handleFormElemClick(
												option,
												titleFormElements[title],
												titleFormElements
											);
										}}
									/>
								)
						)}
						{/* в этом месте можно сделать children */}
						{/* селекты можно сделать map */}
						{/* <Select
							options={fontFamilyOptions}
							title={titleFormElements.fontFamily}
							selected={stateForm.fontFamily}
							onChange={(option) => {
								handleFormElemClick(
									option,
									titleFormElements.fontFamily,
									titleFormElements
								);
							}}
						/>
						<RadioGroup
							options={fontSizeOptions}
							title={titleFormElements.fontSize}
							selected={stateForm.fontSize}
							name={'fontSize'}
							onChange={(option) => {
								handleFormElemClick(
									option,
									titleFormElements.fontSize,
									titleFormElements
								);
							}}
						/>
						<Select
							options={fontColors}
							title={titleFormElements.fontColor}
							selected={stateForm.fontColor}
							onChange={(option) => {
								handleFormElemClick(
									option,
									titleFormElements.fontColor,
									titleFormElements
								);
							}}
						/>
						<Select
							options={backgroundColors}
							title={titleFormElements.backgroundColor}
							selected={stateForm.backgroundColor}
							onChange={(option) => {
								handleFormElemClick(
									option,
									titleFormElements.backgroundColor,
									titleFormElements
								);
							}}
						/>
						<Select
							options={contentWidthArr}
							title={titleFormElements.contentWidth}
							selected={stateForm.contentWidth}
							onChange={(option) => {
								handleFormElemClick(
									option,
									titleFormElements.contentWidth,
									titleFormElements
								);
							}}
						/> */}
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
