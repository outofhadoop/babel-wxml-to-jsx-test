<!-- miniso/storeIndex/storeIndex.wxml -->
<wxs src="../wxs/goods-promotion.wxs" module="utils"></wxs>
<wxs src="../wxs/arithmetic.wxs" module="differ"></wxs>
<wxs src="../wxs/spokesperson.wxs" module="spokesperson"></wxs>
<wxs src="../wxs/storeIndexFilter.wxs" module="filter"></wxs>
<!-- storeDiscountInfo 对 组件 coupon-receive 有引用 -->
<import src="../templates/storeDiscountInfo/index.wxml" />
<import src="../templates/backIcon/index.wxml" />
<import src="../templates/fixCartSlide/index.wxml" />
<import src="../templates/couponContent/index.wxml" />
<!-- 礼品卡实体卡 -->
<wxs src="../../miniso/templates/giftCardEntityCard/index.wxs" module="giftCardEntityCard"></wxs>
<view class="store-page__wrapper">
	<view id="header-wrap" class="store-page__header">
		<view class="header-banner__content">
			<navigation-bar
				class=""
				border="{{ false }}"
				custom-class="{{ videoScene ? 'nav-bar':'' }}"
				videoScenePadding="{{ true }}"
				bgColor="{{ '#FFFFFF' }}"
				right-class="{{ videoScene ? 'nav-right__scene1175':'nav-right' }}"
				zIndex="2"
			>
				<view
					slot="left"
					class="search-box flex {{ videoScene ? 'search-box__1177':'serviceVideoNo' }}"
					wx:if="{{ userMsg.userlevel }}"
					catchtap="toSearch"
				>
					<image src="{{ imgCdn }}/miniso/search-icon0.png" class="search-icon"></image>
					<block wx:if="{{ isOpenRecommend }}">
						<swiper
							class="l"
							autoplay="{{ true }}"
							interval="4000"
							circular="{{ true }}"
							vertical="{{ true }}"
							bindanimationfinish="searchWordFn"
						>
							<swiper-item class="ltext search-text" wx:for="{{ scrollWordList }}" wx:key="word" wx:for-index="index">
								<block wx:if="{{ index<=4 }}">{{item.keyWord}}</block>
							</swiper-item>
						</swiper>
					</block>
				</view>
				<view slot="left" class="search-btn__wrap" wx:if="{{ !userMsg.userlevel }}">
					<button hover-class="none" bindtap="toRegister" wx:if="{{ userInfo }}" class="search-btn">
						<view class="search-box flex {{ videoScene ? 'search-box__1177':'serviceVideoNo' }}">
							<image src="{{ imgCdn }}/miniso/search-icon0.png" class="search-icon"></image>
							<view class="search-text">{{placeholder}}</view>
						</view>
					</button>
					<button hover-class="none" bindtap="showUserInfoPopup" wx:if="{{ !userInfo }}" class="search-btn">
						<view class="search-box flex {{ videoScene ? 'search-box__1177':'serviceVideoNo' }}">
							<image src="{{ imgCdn }}/miniso/search-icon0.png" class="search-icon"></image>
							<view class="search-text">{{placeholder}}</view>
						</view>
					</button>
				</view>
			</navigation-bar>
			<!-- 地址，切换门店 -->
			<view class="selectStore" style="height: {{ bannerContentHeight }}rpx;z-index:0" bindtransitionend="handelTransitionEnd">
				<view class="store-address clearfix">
					<!-- 地址定位- 注册拦截 -->
					<view class="f-28 a-center goAddress" catchtap="goAddress" wx:if="{{ userMsg.userlevel }}">
						<view class="t-l spe-address">
							<image
								class="map-icon"
								src="https://scrm-community.oss-cn-shenzhen.aliyuncs.com/miniso/storeIndex/addressIcon.png"
								mode="widthFix"
							></image>
							<view class="spe-text is-located">{{storeName}}</view>
						</view>
					</view>
					<block wx:else>
						<view class="m-30 f-28 a-center">
							<button class="t-l store-spe-btn" form-type="submit" bindtap="toRegister" wx:if="{{ userInfo }}">
								<image
									class="map-icon"
									src="https://scrm-community.oss-cn-shenzhen.aliyuncs.com/miniso/storeIndex/addressIcon.png"
									mode="widthFix"
								></image>
								<view class="spe-text is-located">{{storeName}}</view>
							</button>
							<button class="t-l store-spe-btn" open-type="getUserInfo" bindtap="alertInitUserInfo" wx:else>
								<image
									class="map-icon"
									src="https://scrm-community.oss-cn-shenzhen.aliyuncs.com/miniso/storeIndex/addressIcon.png"
									mode="widthFix"
								></image>
								<view class="spe-text is-located">{{storeName}}</view>
							</button>
						</view>
					</block>
				</view>
				<view class="discount-info" wx:if="{{ batchList.length > 0 && !hasStoreId }}">
					<!-- hidden="{{isHiddenCollapseTitle}}" -->
					<view class="discount-wrap" slot="title" wx:if="{{ userMsg.userlevel }}" bindtap="handleCollapse">
						<template is="storeDiscountInfo" data="{{ batchList, existAnyReceivable, onlyShowIcon }}" />
					</view>
					<view slot="title" class="discount-wrap" wx:if="{{ !userMsg.userlevel }}">
						<button hover-class="none" bindtap="toRegisterForCupon" wx:if="{{ userInfo }}">
							<template is="storeDiscountInfo" data="{{ batchList, existAnyReceivable, onlyShowIcon }}" />
						</button>
						<button hover-class="none" open-type="getUserInfo" bindtap="alertInitUserInfo" wx:if="{{ !userInfo }}">
							<template is="storeDiscountInfo" data="{{ batchList, existAnyReceivable, onlyShowIcon }}" />
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view></view>
	<view class="store-page__list" bindtouchstart="startDrag" catchtouchmove="onDrag">
		<view class="gradientRamp" wx:if="{{ bannerContentHeight != 0 }}"></view>
		<view class="gradient" wx:else></view>
		<!-- 一级类目 -->
		<view class="storeStairTop" wx:if="{{ tagList.length > 0 }}">
			<scroll-view scroll-x="{{ true }}" scroll-with-animation scroll-left="{{ scrollLeft }}" class="storeTopScroll">
				<view class="tagsInner">
					<view
						class="tagHairlineBottom {{ currentIndex == index ? 'scrollTag active':'scrollTag' }}"
						wx:for="{{ tagList }}"
						wx:key="index"
						bindtap="changeTag"
						data-id="{{ item.id }}"
						id="data{{ item.id }}"
						data-index="{{ index }}"
						data-diy="{{ item.diy }}"
						data-discount="{{ item.isDiscount }}"
						data-status="close"
					>
						<view class="tagIcon">
							<image class="tagImg" src="{{ item.categoryPic }}" mode="widthFix"></image>
						</view>
						<view class="tagText">{{item.categoryName}}</view>
					</view>
					<view class="fillBox"></view>
				</view>
			</scroll-view>
			<view class="projection"></view>
			<view class="rightButton" bindtap="callbackHeight" data-index="{{ currentIndex }}">
				<view class="rightBox">
					<view class="rightTitle">全部</view>
					<image class="rightTriangle" src="{{ imgCdn }}/miniso/storeIndex/pullDown.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 二级类目 -->
		<view class="store-left">
			<scroll-view
				scroll-y="{{ true }}"
				scroll-with-animation
				scroll-top="{{ SecondCategoryScrollTop }}"
				bindscroll="handleLeftScroll"
				upper-threshold="{{ 0 }}"
				class="store-left-scroll store-list__scroll"
				wx:if="{{ subTagList.length > 0 }}"
			>
				<view class="tags-inner">
					<view
						class="tag-hairline--bottom {{ curSubIndex == index ? 'scroll-tag active':'scroll-tag'}} {{curSubIndex == index - 1 ? 'is-next':''}} {{curSubIndex == index + 1 ? 'is-pre':'' }}"
						wx:for="{{ subTagList }}"
						wx:key="index"
						bindtap="subTagChange"
						data-id="{{ item.id }}"
						id="data{{ item.id }}"
						data-index="{{ index }}"
						data-item="{{ item }}"
						data-diy="{{ item.diy }}"
						data-discount="{{ item.isDiscount }}"
						data-status="close"
					>
						<view class="tagBackFill">
							<image class="tagLeftIcon" src="{{ item.categoryPicStr }}" wx:if="{{ item.categoryPicStr }}"></image>
							<view class="tag-text {{ item.categoryPicStr?'tagRightIcon':'' }}">{{item.categoryName}}</view>
						</view>
					</view>
					<view class="fillEmptyBox">
						<view class="fillEmptyContent"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="store-right">
			<swiper
				next-margin="10px"
				bindtouchend="handleSwiperTouchEnd"
				bindanimationfinish="handleSwiperAnimationFinish"
				bindtransition="handleSwiperTransition"
				bindchange="handleSwiperChange"
				style="height: 100%;width: 100%;"
				vertical="{{ true }}"
				current="{{ goodsSwiperCurrentIndex }}"
			>
				<block wx:for="{{ goodsSwiperList }}" wx:for-item="swiperItem" wx:for-index="swiperItemIndex" wx:key="id">
					<swiper-item class="goods-list-swiper-item-before">
						<view wx:if="{{ swiperItemIndex === 0 }}" class="swiper-top-refresher-text">{{refresherContent}}</view>
						<scroll-view
							bindtouchmove="scrollViewOnDrag"
							bindtouchstart="startDrag"
							scroll-y="{{ canScroll }}"
							scroll-top="{{ goodsListScrollTop }}"
							bindscrolltolower="handleScrollToLower"
							lower-threshold="{{ 50 }}"
							wx:if="{{ !skeletonLoading && swiperItemIndex === curSubIndex }}"
							refresher-default-style="none"
							bindscroll="goodsListScroll"
							class="store-right-scroll"
							id="scroll-wrap"
						>
							<view id="inner-wrap" class="inner-wrap">
								<view class="goods-wrap">
									<!-- 商品列表skeletonLoading -->
									<skeleton
										loading="{{ swiperItemIndex !== curSubIndex }}"
										row="{{ 3 }}"
										title-class="custom-skeleton-title"
										title="true"
										content-class="skeleton-content__index"
										rowWidth="{{ skeletonRowWidth }}"
										custom-class="skeleton-wrap"
										row-class="skeleton-row"
									>
										<block>
											<view
												class="association_box"
												wx:if="{{ lbsContent && lbsContent.categoryBannerUrl && currentIndex===0 && swiperItemIndex===0 }}"
											>
												<button bindtap="toReceive" data-store-name="{{ storeName }}">
													<image src="{{ lbsContent.categoryBannerUrl }}" />
												</button>
											</view>
											<!-- 二级导航标题 -->
											<view>
												<view class="goods-nav-wrap goodsBox" data-id="{{ subTagList[swiperItemIndex].id }}">
													<view class="goods-nav-item {{ 'goodsBox-' + subTagList[swiperItemIndex].id }}">
														<text class="category-text">{{subTagList[swiperItemIndex].categoryName}}</text>
													</view>
												</view>
												<!-- goodsList 商品列表 -->
												<block wx:for="{{ swiperItem.data }}" wx:key="index">
													<view
														style="{{ (index > swiperItem.data.length - 6) ? 'transform: translate(0px, ' + swiperItemTransLateY + 'px)' : '' }}"
														bind:touchend="handleScrollBottomViewTouchend"
														bind:touchstart="handleScrollBottomViewTouchStart"
														bind:touchmove="handleScrollBottomViewTouchMove"
														class="transitionTransform goods-box f-30 {{ 'goods-item-secondtag-' + item.__secondtag}} t-l {{'goods-item-'+ item.skuCode }}"
														data-secondtag="{{ item.__secondtag }}"
														bindtap="toGoodDetail"
														data-item="{{ item }}"
														data-index="{{ index }}"
													>
														<view class="goods-left">
															<!-- 只有新人专享商品才显示 -->
															<image
																wx:if="{{ tagId == '049' }}"
																class="img_border"
																mode="widthFix"
																src="{{ imgCdn }}/miniso/new_people/new_people_border.png"
															/>
															<!-- you享卡标签 -->
															<!-- <text class="you-tip" wx:if="{{tagId != '049' && item.youLabel}}">{{item.youLabel}}</text> -->
															<view>
																<view class="goods-img">
																	<c-image src="{{ item.pic }}" withoutTransition mode="aspectFill" />
																	<view
																		class="tag-flag"
																		wx:if="{{ item.activityLabel && (item.activityLabel.startTime <= item.systemTime && item.systemTime <= item.activityLabel.endTime) }}"
																		style="background-image:url({{ item.activityLabel.picture }})"
																	></view>
																</view>
															</view>
														</view>
														<view class="goods-right">
															<view class="goods-right-top">
																<view class="single-ellipsis">
																	<text class="pre-sell-tag" wx:if="{{ item.isPreSale }}">预售</text>
																	{{item.spuInfo?item.spuInfo.name : item.skuName}}
																</view>
																<!-- 促销活动标签start -->
																<view
																	class="promotion-goods__wrapper"
																	wx:if="{{ (utils.isShowStoreIndexPromotionPrice(item)||item.promotionName||item.combineName) || (item.stockSource===0 || item.stockSource===2) || (tagId != '049' && item.youLabel) }}"
																>
																	<view class="mainYouTip" wx:if="{{ tagId != '049' && item.youLabel }}">
																		<text class="txt1">{{filter.separate(item.youLabel)[0]}}</text>
																		<text class="txt2">{{filter.separate(item.youLabel)[1]}}</text>
																	</view>
																	<view class="activity-goods {{ item.youLabel&&(item.stockSource===0)?'elementHide':'' }}" wx:if="{{ item.combineName }}">{{item.combineName}}</view>
																	<!-- 满2件19.9元, 数量拍2 -->
																	<view
																		class="activity-goods {{ (item.combineName&&(item.stockSource===0)||item.youLabel)?'elementHide':''}} {{item.combineName.length>=14?'elementHide':'' }}"
																		wx:if="{{ item.promotionName }}"
																	>{{filter.subT(item.promotionName)}}</view>
																	<!-- 1小时达标签 -->
																	<block wx:if="{{ !item.combineName||item.combineName&&item.combineName.length<14 }}">
																		<label-one-hour stockSource="{{ item.stockSource }}" />
																	</block>
																</view>
															</view>
															<view class="goods-flex flex a-center {{ utils.isShowStoreIndexPromotionPrice(item) ? 'positon_static' : '' }}">
																<view
																	class="new-price-flex"
																	wx:if="{{ (item.plusPrice && item.plusPrice != 0 && item.plusPrice != null) && !giftCardEntityCard.isGiftCardEntity(item) && item.isMemberPlusPrice }}"
																>
																	<view class="new-price-block">
																		<view class="new-price-title">专享</view>
																		<view class="new-price-money">
																			<view class="new-price-int">
																				¥{{filter.segmentation(item.memberPlusPrice)[0]}}
																				<text class="new-price-dec" wx:if="{{ filter.segmentation(item.memberPlusPrice)[1] }}">{{'.'+filter.segmentation(item.memberPlusPrice)[1]}}</text>
																				<text class="new-price-original">¥{{item.price}}</text>
																			</view>
																		</view>
																	</view>
																</view>
																<view class="goods-price" wx:else>
																	<!-- 秒杀价 -->
																	<view
																		class="goods-kill-tag"
																		wx:if="{{ spokesperson.isShowTag(spokespersonData, item.skuCode)&&utils.isShowStoreIndexPromotionPrice(item)&&!item.isPreSale }}"
																	>秒杀</view>
																	<view class="goods-money-box">
																		<view
																			class="promotion-price {{ (spokesperson.isShowTag(spokespersonData, item.skuCode)&&utils.isShowStoreIndexPromotionPrice(item)&&!item.isPreSale)?'':'blackStyle' }}"
																			wx:if="{{ !utils.isShowStoreIndexPromotionPrice(item) }}"
																		>
																			¥{{filter.segmentation(item.price)[0]}}
																			<text class="font_s_txt {{ (spokesperson.isShowTag(spokespersonData, item.skuCode)&&utils.isShowStoreIndexPromotionPrice(item)&&!item.isPreSale)?'':'blackStyle' }}" wx:if="{{ filter.segmentation(item.price)[1] }}">{{'.'+filter.segmentation(item.price)[1]}}</text>
																		</view>
																		<view
																			class="promotion-price {{ (spokesperson.isShowTag(spokespersonData, item.skuCode)&&utils.isShowStoreIndexPromotionPrice(item)&&!item.isPreSale)?'':'blackStyle' }}"
																			wx:else
																		>
																			¥{{filter.segmentation(item.unitPrice)[0]}}
																			<text class="font_s_txt {{ (spokesperson.isShowTag(spokespersonData, item.skuCode)&&utils.isShowStoreIndexPromotionPrice(item)&&!item.isPreSale)?'':'blackStyle' }}" wx:if="{{ filter.segmentation(item.unitPrice)[1] }}">{{'.'+filter.segmentation(item.unitPrice)[1]}}</text>
																			<text class="original-price original-price-text {{ (filter.segmentation(item.unitPrice)[1])?'':'originSele' }}">¥{{item.price}}</text>
																		</view>
																	</view>
																</view>
																<!-- 实体卡礼品卡隐藏加购 -->
																<block wx:if="{{ !giftCardEntityCard.isGiftCardEntity(item) }}">
																	<block wx:if="{{ !userMsg }}">
																		<button class="goods-add flex-1 t-r" form-type="submit" catchtap="toRegisterForPopup" wx:if="{{ userInfo }}"></button>
																		<button class="goods-add flex-1 t-r" open-type="getUserInfo" bindtap="alertInitUserInfo" catchtap="catchtapFun" wx:else></button>
																	</block>
																	<!-- spu版本改为只显示添加 -->
																	<view class="goods-add flex-1 t-r" wx:else>
																		<block wx:if="{{ item.skuCode !== '2010685510105' }}">
																			<view
																				class="goods-add-row"
																				catchtap="addGoodGroup"
																				data-item="{{ item }}"
																				data-skulimit="{{ item.skuLimit }}"
																				isLimit="{isLimit}"
																				limitSkuCode="{{ item.limitSkuCode }}"
																				data-updateType="{{ updateType }}"
																				data-index="{{ index }}"
																				wx:if="{{ item.isLimit }}"
																			></view>
																			<view
																				class="goods-add-row"
																				catchtap="addGoodGroup"
																				data-item="{{ item }}"
																				data-updateType="{{ updateType }}"
																				data-index="{{ index }}"
																				wx:else
																			></view>
																		</block>
																	</view>
																</block>
															</view>
															<!-- 每单限购3件 -->
															<!-- <view class="promotion-tips" wx:if="{{item.buyLimited}}">{{utils.getBuyLimitedStoreInfo(item)}}</view> -->
															<view
																class="new-price"
																wx:if="{{ (item.plusPrice && item.plusPrice != 0 && item.plusPrice != null) && !giftCardEntityCard.isGiftCardEntity(item) && !item.isMemberPlusPrice }}"
															>
																<image
																	class="plus-goods-img-new"
																	wx:if="{{ item.isMemberPlusPrice }}"
																	src="{{ imgCdn }}/miniso/plus/fixed-price/exclusive-price.png?a=1"
																></image>
																<image class="plus-goods-img" wx:else src="{{ imgCdn }}/miniso/plus/fixed-price/plus-goods-new.png?11"></image>
																<text class="unit">¥</text>
																<text class="plus-price">{{item.isMemberPlusPrice?item.memberPlusPrice:item.plusPrice}}</text>
															</view>
														</view>
													</view>
												</block>
											</view>
										</block>
									</skeleton>
									<!-- 没有商品 -->
									<view
										class="nothing-wrapper {{ tagList.length === 0 ? 'is-fill' : 'is-up' }}"
										wx:if="{{ !showNoMore && goodsList.length === 0 }}"
									>
										<image src="{{ imgCdn }}/miniso/order-404-new.png"></image>
										<view>
											<view class="text">当前位置暂无门店推荐</view>
											<view class="address-btn red-bg" catchtap="goAddress" wx:if="{{ userMsg.userlevel }}">切换收货地址</view>
											<view wx:if="{{ !userMsg.userlevel }}">
												<button bindtap="toRegister" wx:if="{{ userInfo }}" class="address-btn red-bg">切换收货地址</button>
												<button bindtap="showUserInfoPopup" wx:if="{{ !userInfo }}" class="address-btn red-bg">切换收货地址</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<!-- 这里只是占位的骨架屏skeletonLoading -->
						<view
							class="transitionTransform"
							style="padding-bottom: 50rpx;heihgt:100%;margin-bottom: 20rpx;{{ (index > swiperItem.data.length - 6) ? 'transform: translate(0px, ' + swiperItemTransLateY + 'px)' : '' }}"
							wx:if="{{ skeletonLoading || !showNolocation || swiperItemIndex !== curSubIndex }}"
						>
							<skeleton
								loading="{{ skeletonLoading || !showNolocation || swiperItemIndex !== curSubIndex }}"
								wx:for="{{ 6 }}"
								wx:key="index"
								row="{{ 3 }}"
								title-class="custom-skeleton-title"
								title="true"
								rowWidth="{{ skeletonRowWidth }}"
								custom-class="skeleton-wrap-six"
								row-class="skeleton-row"
							></skeleton>
						</view>
						<view class="swiper-bottom-refresher-text transitionTransform" wx:if="{{ swiperItemIndex === goodsSwiperList.length - 1 }}">{{upperRefresherContent}}</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 优惠券弹框 -->
		<c-info-modal
			wx:if="{{ isHiddenCollapseTitle && collapseValue }}"
			title="优惠券"
			bottomBackgroundColor="#f5f5f5"
			bind:closeOnTap="toCollapse"
		>
			<view slot="content">
				<block wx:if="{{ !isAllCouponGet }}">
					<view class="couponList-getAll">
						<text class="couponList-getAll-title">快看看，你还有优惠券没领取喔</text>
						<c-button size="small" type="primary" bindtap="acquireCouponBatch">一键领取</c-button>
					</view>
				</block>
				<view class="collpase-coupon">
					<block wx:if="{{ couponBanner.src }}">
						<navigator url="{{ couponBanner.navigateUrl }}" bind:tap="couponBannerOnTap">
							<c-image src="{{ couponBanner.src }}" class="couponList-banner" mode="aspectFill" imageSize="11.4%"></c-image>
						</navigator>
					</block>
					<!-- 放优惠券的内容 -->
					<template is="couponContent" data="{{ overDue,couponList, filter, couponDescription }}" />
				</view>
			</view>
		</c-info-modal>
	</view>
	<!-- 新版购物车浮层 -->
	<!-- <template is="fixCart"
    data="{{gatherVisible,gatherListData,gatherOrderData,promotionAmount,expaned,imgCdn,omsCartItems,scrollCartHeight,showCartList,isNotFixed,carNumber,deliveryAmount,freePostalAmount,orderPs,shopPrice,discountPrice,animationCart,deliveryAmountNote,orderPsNote,usePlace,goodsList,isAllCouponGet,isOpenGetCouponClosing,isCouponSuccessLook,hasFreeShipping}}" /> -->
	<!-- <template is="fixCartSlide"
     data="{{fixCartData,isIcon}}" wx:if="{{userMsg}}"/> -->
	<!-- <c-fixed-icon-container>
    <navigator url="/miniso/cart/cart" open-type="switchTab" wx:if="{{userMsg}}">
      <c-cart-icon />
    </navigator>
    <view class="" bindtap="toRegister" wx:else>
      <c-cart-icon />
    </view>
  </c-fixed-icon-container> -->
</view>
<!-- 未授权定位 -->
<view class="no-authorize" wx:if="{{ !showNolocation }}">
	<view class="title f-28">您未授权定位，部分信息无法查看</view>
	<view class="desc f-24">若您已开通定位权限仍无定位使用，请尝试查</view>
	<view class="desc f-24">看手机定位服务是否正常</view>
	<view class="red-btn f-26" bindtap="showlocationModal">授权定位</view>
</view>
<!-- 定位权限获取 -->
<view wx:if="{{ showCon }}" class="modal-mask" bindtap="changeModalCancel">
	<view class="modal-dialog">
		<view class="modal-title">温馨提示</view>
		<view class="modal-content">获取定位失败，请前往设置打开定位权限</view>
		<view class="modal-footer">
			<view class="btn-cancel" catchtap="changeModalCancel">取消</view>
			<button
				open-type="openSetting"
				bindopensetting="handler"
				class="btn-confirm button-on-view"
				style="padding:0rpx;"
				catchtap="changeModalCancel"
			>设置</button>
		</view>
	</view>
</view>
<tip-modal visible="{{ explain1.visiblePopup }}" position="center" bind:hidden="hiddenExplain1">
	<!-- 用户确认信息 -->
	<view class="modal-msg">
		<view class="msg-top" wx:if="{{ userRefresh }}">
			<image src="{{ userRefresh.avatarUrl }}" mode="widthFix" class="msg-header-img"></image>
			<view class="msg-top-name">{{userRefresh.nickName}}</view>
		</view>
		<view class="msg-top" wx:else>
			<image src="{{ userInfo.avatarUrl }}" mode="widthFix" class="msg-header-img"></image>
			<view class="msg-top-name">{{userInfo.nickName}}</view>
		</view>
		<view class="msg-infomation">请问该用户信息是你自己的吗？</view>
		<view class="msg-btn">
			<view class="fail-btn" bindtap="notInfomation">不是</view>
			<view class="sure-btn" bindtap="sureInfomation">是</view>
		</view>
	</view>
</tip-modal>
<!-- 允许授权 -->
<user-info
	bind:user="setUserInfo"
	bind:logined="handleLogined"
	bind:showtip="setShowTip"
	visiblePopup="{{ visiblePopup }}"
	id="userInfo"
></user-info>
<!-- 客服 -->
<!-- <service-modal wx:if="{{!isNewService}}" visiblePopup="{{visibleService}}"
  url="https://miniso.sobot.com/chat/h5/v2/index.html?sysnum=0aca0aa3d9db4d91a8d544931f2efcb7&channelid=2">
</service-modal>
<service-modal wx:if="{{isNewService}}" visiblePopup="{{visibleService}}"
  url="https://kfgztmd.miniso.com/webchat/jsp/standard/interfacePools.jsp?device=mobile&queue=73&wchatflag=1&brand=1&from=30003&customer_id={{contentUid}}">
</service-modal> -->
<add-parabola
	wx:for="{{ parabolaArr }}"
	parabolaData="{{ parabola }}"
	id="{{ parabola.id }}"
	wx:for-item="parabola"
	wx:key="id"
	bind:complete="handleCompleteParabola"
></add-parabola>
<!-- 未支付提醒弹框 -->
<red-btn-modal
	visiblePopup="{{ noPayment.visiblePopup }}"
	visibleClose="{{ noPayment.visibleClose }}"
	tips="{{ noPayment.tips }}"
	isOther="{{ noPayment.isOther }}"
	width="520"
	height="390"
	cancelBtn="{{ noPayment.cancelBtn }}"
	confirmBtn="{{ noPayment.confirmBtn }}"
	bind:confirm="goPayOrder"
	bind:cancel="goService"
></red-btn-modal>
<!-- 隐私授权 -->
<!-- <auth-popup visible="{{policyVisiblePopup}}" bind:hidden="hiddenAuth"></auth-popup> -->
<popup show="{{ orderAgainVisible }}" position="bottom" custom-class="order-again__popup">
	<view class="again-wrap">
		<view class="again-wrap__close" bind:tap="handleClickCloseOrderAgain">
			<image src="{{ imgCdn }}/miniso/close-popup.png" />
		</view>
		<view class="again-title">
			<view class="again-title__text">当前地址和订单地址不一致，</view>
			<view class="again-title__text">请选择收货地址</view>
		</view>
		<view class="again-address">
			<view class="again-address__wrap">
				<view class="again-address__text">当前地址：</view>
				<view class="again-address__detail">{{orderAgain.currentReceiverAddress}}</view>
			</view>
			<view class="again-address__wrap">
				<view class="again-address__text">订单地址：</view>
				<view class="again-address__detail">{{orderAgain.orderReceiverAddress}}</view>
			</view>
		</view>
		<view class="again-operate">
			<button class="again-btn is-normal" hover-class="none" bindtap="orderAgainInOrderAddress">使用订单地址</button>
			<button class="again-btn is-focus" hover-class="none" bindtap="orderAgainInCurrentAddress">选择当前地址</button>
		</view>
	</view>
</popup>
<popup show="{{ orderAgainResultVisible }}" position="center" custom-class="again-result__popup">
	<view class="again-result__wrap">
		<view class="again-result__close" bind:tap="hideOrderAgainResult">
			<image src="{{ imgCdn }}/miniso/close-popup.png" />
		</view>
		<view class="again-result__list">
			<view class="again-result__bar" wx:if="{{ orderAgainResponseList.length >= 5 }}">
				<view class="again-result__bar-inner" style="top:{{ orderAgainResultScrollTop }}rpx"></view>
			</view>
			<scroll-view
				scroll-y="{{ true }}"
				class="again-result__scroll"
				style="height:{{ orderAgainSrcollHeight }}rpx"
				bindscroll="handleScrollOrderAgainResult"
			>
				<view class="again-result__item" wx:for="{{ orderAgainResponseList }}" wx:key="index">
					<!-- 判断是否多于5 -->
					<view class="again-result__detail">
						<view class="again-result__namewrap">
							“
							<view class="again-result__name">{{item.stockMsg}}</view>
							”
						</view>
						<view class="again-result__status">{{filter.getOrderAgainResultStatusText(item)}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="again-operate__result">
			<button class="again-btn is-focus is-result" hover-class="none" bindtap="hideOrderAgainResult">知道了</button>
		</view>
	</view>
</popup>
<!-- 月卡推荐弹窗 -->
<view wx:if="{{ dialogPLusMonthShow }}" class="modal-mask-plus-month">
	<view class="modal-dialog" catchtap="goDialogPlus" animation="{{ animationPlusMonth }}" data-index="{{ 1 }}">
		<image class="modal-bg" src="{{ imgCdn}}/miniso/plus/plus-change-ui/dialog-month.png?a={{filter.date }}"></image>
	</view>
	<image
		class="modal-close"
		src="{{ imgCdn }}/miniso/plus/close.png"
		animation="{{ animationPlusMonth }}"
		catchtap="closePLusMonthDialog"
	></image>
</view>
<!-- spu弹窗 -->
<spu-popup
	visible="{{ spuVisible }}"
	goodsInfo="{{ spuGoodsInfo }}"
	isBottomBtn="true"
	bind:sureButton="spuSureButton"
	id="spuPopup"
></spu-popup>
<register-popup visible="{{ registerVisible }}" bind:success="handleRegisterSuccess"></register-popup>
<!-- 名气开箱计时任务 -->
<unpack-task-clock></unpack-task-clock>
<!-- 一级类目弹窗 -->
<first-tab-list bind:firstShowEvt="firstShowEvt" firstTabData="{{ firstTabData }}" tagList="{{ tagList }}"></first-tab-list>
<!-- 优惠券提示领取弹窗 -->
<store-index-coupons-popup
	bindacquireCouponBatch="invokeAcquireCouponBatch"
	couponList="{{ couponList }}"
	existAnyReceivable="{{ existAnyReceivable }}"
	totalCouponAmount="{{ totalCouponAmount }}"
	couponPopupABTestGroup="{{ couponPopupABTestGroup }}"
/>
<!-- 遮罩层 -->
<view class="maskTop" wx:if="{{ maskTop }}"></view>