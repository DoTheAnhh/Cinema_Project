import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";


const UserFooter: React.FC = () => {
    return (
        <Footer style={{ width: '100%', backgroundColor: '#333333', display: 'flex', justifyContent: 'space-between', padding: '0 140px' }}>
            <div style={{ color: '#FFF5D1', flex: 1, marginTop: 40, marginLeft: 40, marginRight: 200 }}>
                <div style={{ fontWeight: 'normal', fontSize: 20, marginBottom: 40, }}>Giới thiệu</div>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: 20 }}>Về chúng tôi</li>
                        <li style={{ marginBottom: 20 }}>Thỏa thuận sử dụng</li>
                        <li style={{ marginBottom: 20 }}>Cơ chế hoạt động</li>
                        <li style={{ marginBottom: 20 }}>Chính sách bảo mật</li>
                    </ul>
                </div>
            </div>
            <div style={{ color: '#FFF5D1', flex: 1, marginTop: 40, marginRight: 200 }}>
                <div style={{ fontWeight: 'normal', fontSize: 20, marginBottom: 40 }}>Góc điện ảnh</div>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: 20 }}>Thể loại phim</li>
                        <li style={{ marginBottom: 20 }}>Bình luận phim</li>
                        <li style={{ marginBottom: 20 }}>Blog điện ảnh</li>
                        <li style={{ marginBottom: 20 }}>Phim hay tháng</li>
                        <li style={{ marginBottom: 20 }}>Phim IMAX</li>
                    </ul>
                </div>
            </div>
            <div style={{ color: '#FFF5D1', flex: 1, marginTop: 40, marginRight: 200 }}>
                <div style={{ fontWeight: 'normal', fontSize: 20, marginBottom: 40 }}>Hỗ trợ</div>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: 20 }}>Góp ý</li>
                        <li style={{ marginBottom: 20 }}>Sale & Services</li>
                        <li style={{ marginBottom: 20 }}>Rạp/Giá vé</li>
                        <li style={{ marginBottom: 20 }}>Tuyển dụng</li>
                        <li style={{ marginBottom: 20 }}>FQA</li>
                    </ul>
                </div>
            </div>
            <div style={{ color: '#FFF5D1', flex: 1, marginTop: 240, marginLeft: 50 }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ fontSize: '32px', marginLeft: -100 }}>
                        <FacebookOutlined />
                    </div>
                    <div style={{ fontSize: '32px', marginLeft: 50 }}>
                        <YoutubeOutlined />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default UserFooter