import React from 'react';
import { connect } from 'react-redux';
import {
	Notify,
	createNotification,
	removeNotification,
	removeAllNotifications,
	NOTIFICATION_TYPE_SUCCESS,
	NOTIFICATION_TYPE_WARNING,
	NOTIFICATION_TYPE_INFO,
	NOTIFICATION_TYPE_ERROR,
	NOTIFICATIONS_POS_TOP_RIGHT,
	NOTIFICATIONS_POS_BOT_RIGHT,
	NOTIFICATIONS_POS_BOT_LEFT,
	NOTIFICATIONS_POS_TOP_LEFT
} from 'react-redux-notify';

const icons = {
	[NOTIFICATION_TYPE_ERROR]: <i className="fa fa-fire" />,
	[NOTIFICATION_TYPE_SUCCESS]: <i className="fa fa-check" />,
	[NOTIFICATION_TYPE_INFO]: <i className="fa fa-info" />,
	[NOTIFICATION_TYPE_WARNING]: <i className="fa fa-warning" />
};

const customNotificationStyles = {
	content: 'customContent'
};
const CUSTOM_POSITION = 'TopCenter';
const customNotifyStyles = {
	containerTopCenter: 'containerTopCenter'
};

const MyCustomNotificationComponent = ({
	message,
	type,
	canDismiss,
	acceptBtn,
	denyBtn,
	icon,
	customStyles,
	id,
	isFirst,
	handleDismiss,
	handleDismissAll
}) => {
	let styles = {
		margin: '5px 0',
		padding: '2px 5px',
		border: '1px solid #333',
		float: 'right',
		clear: 'right',
		width: '330px',
		boxSizing: 'border-box'
	};
	if (canDismiss) {
		styles = Object.assign({}, styles, { cursor: 'pointer' });
	}
	return (
		<div
			onClick={e => {
				if (canDismiss) {
					handleDismiss(id);
				}
			}}
			style={styles}
		>
			{message}
		</div>
	);
};

class ExampleNotifications extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Hello There!',
			type: NOTIFICATION_TYPE_ERROR,
			icon: icons[NOTIFICATION_TYPE_ERROR],
			duration: 0,
			acceptBtn: {
				handler: (e, notification) => {
					alert('Ayyyyy :)');
					notification.handleDismiss(notification.id);
				},
				title: 'Accept',
				icon: 'fa fa-thumbs-up'
			},
			denyBtn: {
				handler: (e, notification) => {
					alert('Get Lost. -.-');
					notification.handleDismiss(notification.id);
				},
				title: 'Deny',
				icon: 'fa fa-thumbs-down'
			},
			localization: {
				closeAllBtnText: 'Close dem all',
				acceptBtnText: 'Yes',
				denyBtnText: 'No'
			},
			customLocalization: false,
			canDismiss: true,
			globalCustomNotification: false,
			position: NOTIFICATIONS_POS_TOP_RIGHT,
			forceClose: false,
			showCloseAllBtn: false
		};
		this.createNotification = this._createNotification.bind(this);
		this.handleFieldChange = this._handleFieldChange.bind(this);
	}

	_handleFieldChange(field) {
		return e => {
			if (
				field === 'canDismiss' ||
				field === 'globalCustomNotification' ||
				field === 'forceClose' ||
				field === 'customLocalization' ||
				field === 'showCloseAllBtn'
			) {
				const fieldVal = e.target.checked;
				if (field === 'customLocalization' && e.target.checked) {
					return this.setState((prevState, props) => {
						return {
							...prevState,
							acceptBtn: {
								...prevState.acceptBtn,
								title: ''
							},
							denyBtn: {
								...prevState.denyBtn,
								title: ''
							},
							[field]: fieldVal
						};
					});
				} else if (field === 'customLocalization' && !e.target.checked) {
					return this.setState((prevState, props) => {
						return {
							...prevState,
							acceptBtn: {
								...prevState.acceptBtn,
								title: 'Accept'
							},
							denyBtn: {
								...prevState.denyBtn,
								title: 'Deny'
							},
							[field]: fieldVal
						};
					});
				}
				return this.setState({ [field]: fieldVal });
			} else if (field === 'customComponent') {
				const componentToUse = e.target.checked ? MyCustomNotificationComponent : undefined;
				this.setState({ [field]: componentToUse });
			} else if (field === 'customStyles') {
				const styles = e.target.checked ? customNotificationStyles : undefined;
				this.setState({ customStyles: styles });
			} else {
				if (field === 'duration') {
					return this.setState({ [field]: parseInt(e.target.value, 10) });
				}
				if (field === 'type') {
					this.setState({ icon: icons[e.target.value] });
				}
				this.setState({ [field]: e.target.value });
			}
		};
	}

	_createNotification(e) {
		e.preventDefault();
		const { createNotification } = this.props;
		const nProps = Object.assign({}, this.state);
		delete nProps['localization'];
		delete nProps['showCloseAllBtn'];
		createNotification(nProps);
	}

	render() {
		const NotificationComponentProp = this.state.globalCustomNotification
			? MyCustomNotificationComponent
			: undefined;
		let notifyProps = {
			notificationComponent: NotificationComponentProp,
			position: this.state.position,
			forceClose: this.state.forceClose,
			customStyles: customNotifyStyles,
			localization: this.state.customLocalization ? this.state.localization : undefined,
			showCloseAllBtn: this.state.showCloseAllBtn
		};

		return (
			<div>
				<Notify {...notifyProps} />

				<form
					className="pure-form pure-form-stacked"
					style={{
						width: '300px',
						height: '500px',
						top: '50%',
						left: '50%',
						position: 'relative',
						transform: 'translate3d(-50%, 50%, 0)',
						textAlign: 'center'
					}}
				>
					<label>
						<strong>Message: </strong>
					</label>
					<input
						style={{ display: 'inline-block' }}
						type="text"
						value={this.state.message}
						onChange={this.handleFieldChange('message')}
					/>
					<label>
						<strong>Duration: </strong>
					</label>
					<input
						style={{ display: 'inline-block' }}
						type="number"
						value={this.state.duration}
						onChange={this.handleFieldChange('duration')}
					/>
					<label>
						<strong>Type: </strong>
					</label>
					<input
						type="radio"
						value={NOTIFICATION_TYPE_SUCCESS}
						checked={this.state.type === NOTIFICATION_TYPE_SUCCESS}
						onChange={this.handleFieldChange('type')}
					/>{' '}
					Success <br />
					<input
						type="radio"
						value={NOTIFICATION_TYPE_WARNING}
						checked={this.state.type === NOTIFICATION_TYPE_WARNING}
						onChange={this.handleFieldChange('type')}
					/>{' '}
					Warning <br />
					<input
						type="radio"
						value={NOTIFICATION_TYPE_ERROR}
						checked={this.state.type === NOTIFICATION_TYPE_ERROR}
						onChange={this.handleFieldChange('type')}
					/>{' '}
					Error <br />
					<input
						type="radio"
						value={NOTIFICATION_TYPE_INFO}
						checked={this.state.type === NOTIFICATION_TYPE_INFO}
						onChange={this.handleFieldChange('type')}
					/>{' '}
					Info <br />
					<label>
						<strong>Can Dismiss: </strong>
					</label>
					<input
						type="checkbox"
						defaultChecked={this.state.canDismiss}
						onChange={this.handleFieldChange('canDismiss')}
					/>
					<label>
						<strong>Custom Localization Text: </strong>
					</label>
					<input
						type="checkbox"
						defaultChecked={this.state.customLocalization}
						onChange={this.handleFieldChange('customLocalization')}
					/>
					<label>
						<strong>Custom Global Notification Component: </strong>
					</label>
					<input
						type="checkbox"
						defaultChecked={this.state.globalCustomNotification}
						onChange={this.handleFieldChange('globalCustomNotification')}
					/>
					<label>
						<strong>Custom Notification Component: </strong>
					</label>
					<input
						type="checkbox"
						defaultChecked={false}
						onChange={this.handleFieldChange('customComponent')}
					/>
					<label>
						<strong>Container Position: </strong>
					</label>
					<input
						type="radio"
						value={NOTIFICATIONS_POS_TOP_RIGHT}
						checked={this.state.position === NOTIFICATIONS_POS_TOP_RIGHT}
						onChange={this.handleFieldChange('position')}
					/>{' '}
					Top Right <br />
					<input
						type="radio"
						value={NOTIFICATIONS_POS_BOT_RIGHT}
						checked={this.state.position === NOTIFICATIONS_POS_BOT_RIGHT}
						onChange={this.handleFieldChange('position')}
					/>{' '}
					Bottom Right <br />
					<input
						type="radio"
						value={NOTIFICATIONS_POS_BOT_LEFT}
						checked={this.state.position === NOTIFICATIONS_POS_BOT_LEFT}
						onChange={this.handleFieldChange('position')}
					/>{' '}
					Bottom Left <br />
					<input
						type="radio"
						value={NOTIFICATIONS_POS_TOP_LEFT}
						checked={this.state.position === NOTIFICATIONS_POS_TOP_LEFT}
						onChange={this.handleFieldChange('position')}
					/>{' '}
					Top Left <br />
					<input
						type="radio"
						value={CUSTOM_POSITION}
						checked={this.state.position === CUSTOM_POSITION}
						onChange={this.handleFieldChange('position')}
					/>{' '}
					Custom Position - Top Center <br />
					<label>
						<strong>Custom Notification Styles: </strong>
					</label>
					<input type="checkbox" defaultChecked={false} onChange={this.handleFieldChange('customStyles')} />
					<label>
						<strong>Force Close Notifications: </strong>
					</label>
					<input
						type="checkbox"
						defaultChecked={this.state.forceClose}
						onChange={this.handleFieldChange('forceClose')}
					/>
					<label>
						<strong>Show Close All Button: </strong>
					</label>
					<input
						type="checkbox"
						defaultChecked={this.state.showCloseAllBtn}
						onChange={this.handleFieldChange('showCloseAllBtn')}
					/>
					<div style={{ paddingTop: '10px' }}>
						<button
							onClick={e => this.createNotification(e)}
							style={{ margin: '0 auto' }}
							className="pure-button pure-button-primary"
						>
							Create Notification!
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createNotification: config => {
			dispatch(createNotification(config));
		},
		removeNotification: id => {
			dispatch(removeNotification(id));
		},
		removeAllNotifications: () => {
			dispatch(removeAllNotifications());
		}
	};
};

export default connect(null, mapDispatchToProps)(ExampleNotifications);
