import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useState } from 'react';
// мои наработки
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { OptionType } from 'src/constants/articleProps';
// import { StoryDecorator } from 'src/ui/story-decorator';
// import {}
import { Text } from 'src/ui/text';
//  пропсы для ArticleParamsForm
import { Separator } from 'src/ui/separator';
//  состояние данных формы
export type FormState<T> = {
	fontFamily: T;
	fontSize: T;
	fontColor: T;
	backgroundColor: T;
	contentWidth: T;
};

type TitlesFormElems = string;

export type submitForm = FormState<OptionType>;
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

type FormProps = {
	initState: FormState<OptionType>;
	dataFields: FormState<OptionType[]>;
	onSubmit?: (data: FormState<OptionType>) => void;
};

export const ArticleParamsForm = ({
	initState,
	dataFields,
	onSubmit,
}: FormProps) => {
	// открытие формы
	const [isOpen, setIsOpen] = useState(false);

	const [stateForm, setStateForm] = useState<FormState<OptionType>>(initState);
	// фнкция отправки формы
	function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
		// React.FormEvent - типизация событий формы submit
		// HTMLFormElement связнное с тегом form
		e.preventDefault();
		if (onSubmit) {
			onSubmit(stateForm);
		}
	}
	// функция сброса формы
	function handleResetForm() {
		setStateForm(initState);
	}

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
				<form onSubmit={handleSubmitForm} className={styles.form}>
					{/* заголовок тоже можно пустить через пропс */}
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/* моя правка */}
					<div className={styles.selectGroup}>
						{(Object.entries(dataFields) as PairData[]).map(
							// кортеж PairData  а если такой ключ title ?? в объекте Object.entries(articlesData)

							([title, options]) => {
								if (title === 'fontSize') {
									return (
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
									);
								}
								if (title === 'fontColor') {
									return (
										<React.Fragment key={title}>
											<Select
												options={options}
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
											<Separator />
										</React.Fragment>
									);
								}
								return (
									<Select
										key={title}
										options={options}
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
								);
							}
						)}
					</div>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleResetForm}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
