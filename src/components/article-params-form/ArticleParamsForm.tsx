import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
// мои наработки
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
// import { StoryDecorator } from 'src/ui/story-decorator';
// import {}
import { Text } from 'src/ui/text';
//  пропсы для ArticleParamsForm

//  изменить типизацию
type FormState<T> = {
	fontFamily: T;
	fontSize: T;
	fontColor: T;
	backgroundColor: T;
	contentWidth: T;
};

// перенести в раздел данные файла  ArticleProps и возможно испльзовать в map

const titleFormElements: FormState<string> = {
	fontFamily: 'Шрифт',
	fontSize: 'Размер шрифта',
	fontColor: 'Цвет шрифта',
	backgroundColor: 'Цвет фона',
	contentWidth: 'Ширина контента',
};

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [stateForm, setStateForm] = useState<FormState<OptionType>>({
		fontColor: fontColors[0],
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	});

	function handleRadioClick(
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

	function handlOpenFormClick() {
		setIsOpen(!isOpen);
	}
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handlOpenFormClick();
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
						{/* в этом месте можно сделать children */}
						{/* селекты можно сделать map */}
						<Select
							options={fontFamilyOptions}
							title={'Шрифт'}
							selected={stateForm.fontFamily}
							onChange={(option) => {
								handleRadioClick(option, 'Шрифт', titleFormElements);
							}}
						/>
						<RadioGroup
							options={fontSizeOptions}
							title={'Размер шрифта'}
							selected={stateForm.fontSize}
							name={'fontSize'}
							onChange={(option) => {
								handleRadioClick(option, 'Размер шрифта', titleFormElements);
							}}
						/>
						<Select
							options={fontColors}
							title={'Цвет шрифта'}
							selected={stateForm.fontColor}
							onChange={(option) => {
								handleRadioClick(option, 'Цвет шрифта', titleFormElements);
							}}
						/>
						<Select
							options={backgroundColors}
							title={'Цвет фона'}
							selected={stateForm.backgroundColor}
							onChange={(option) => {
								handleRadioClick(option, 'Цвет фона', titleFormElements);
							}}
						/>
						<Select
							options={contentWidthArr}
							title={'Ширина контента'}
							selected={stateForm.contentWidth}
							onChange={(option) => {
								handleRadioClick(option, 'Ширина контента', titleFormElements);
							}}
						/>
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
